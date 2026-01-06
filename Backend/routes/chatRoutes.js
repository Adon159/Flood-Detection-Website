const express = require("express");
const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");

const router = express.Router();

/* ---------------- Create / Get Chat Room ---------------- */
router.post("/room", async (req, res) => {
  try {
    let { userId, userRole } = req.body;

    console.log("POST /api/chat/room body:", req.body);

    if (!userId || !userRole) {
      return res.status(400).json({ message: "Missing user data" });
    }

    // ✅ FIX: normalize role (Victim → victim)
    userRole = userRole.toLowerCase();

    // Ensure single room per user+role using upsert to avoid duplicates
    const mongoose = require("mongoose");

    // Accept string or ObjectId values for userId; normalize to string
    const userIdStr = String(userId);

    const query = { userId: userIdStr, userRole };
    const update = { $setOnInsert: { userId: userIdStr, userRole } };
    const opts = { new: true, upsert: true };
    let room;
    try {
      room = await ChatRoom.findOneAndUpdate(query, update, opts);
    } catch (e) {
      console.error("CHAT ROOM UPSERT ERROR:", e);
      // Handle duplicate-key race condition: return the existing room if possible
      if (e && e.code === 11000) {
        room = await ChatRoom.findOne(query);
      } else {
        throw e;
      }
    }

    res.json(room);
  } catch (err) {
    console.error("CHAT ROOM ERROR:", err);
    res.status(500).json({ message: "Failed to create chat room", error: err.message, stack: err.stack });
  }
});

/* ---------------- Get Messages ---------------- */
router.get("/messages/:roomId", async (req, res) => {
  try {
    const messages = await Message.find({
      chatRoomId: req.params.roomId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error("LOAD MESSAGES ERROR:", err);
    res.status(500).json({ message: "Failed to load messages" });
  }
});

/* ---------------- Send Message (Socket.IO) ---------------- */
router.post("/message", async (req, res) => {
  try {
    const io = req.app.get("io");

    let { senderRole } = req.body;

    // normalize sender role too
    if (senderRole) {
      req.body.senderRole = senderRole.toLowerCase();
    }

    const mongoose = require("mongoose");
    // Coerce IDs to ObjectId when valid to avoid cast errors
    if (!req.body.chatRoomId) {
      return res.status(400).json({ message: "Missing chatRoomId" });
    }

    // Normalize IDs to strings to avoid cast errors
    req.body.chatRoomId = String(req.body.chatRoomId);
    if (req.body.senderId) req.body.senderId = String(req.body.senderId);

    console.log("POST /api/chat/message body:", req.body);

    let message;
    try {
      message = await Message.create(req.body);
    } catch (createErr) {
      console.error("MESSAGE CREATE ERROR:", createErr);
      return res.status(500).json({ message: "Failed to create message", error: createErr.message, stack: createErr.stack });
    }

    // Increase unread count for admin
    if (req.body.senderRole !== "admin") {
      await ChatRoom.findByIdAndUpdate(req.body.chatRoomId, {
        $inc: { unreadForAdmin: 1 },
      });
    }

    // Emit real-time events
    io.to(req.body.chatRoomId).emit("receiveMessage", message);
    io.emit("adminUnreadUpdate");

    res.json(message);
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
});

/* ---------------- Admin: Get All Rooms ---------------- */
router.get("/admin/rooms", async (req, res) => {
  try {
    // Return rooms along with user name and email for admin display
    const rooms = await ChatRoom.find().sort({ updatedAt: -1 }).lean();

    const userIds = rooms.map((r) => r.userId).filter(Boolean);

    const User = require("../models/User");
    const users = await User.find({ _id: { $in: userIds } })
      .select("name email")
      .lean();

    const userMap = new Map(users.map((u) => [String(u._id), u]));

    const roomsWithUser = rooms.map((r) => {
      const u = userMap.get(String(r.userId));
      return {
        ...r,
        userName: u ? u.name : null,
        userEmail: u ? u.email : null,
      };
    });

    res.json(roomsWithUser);
  } catch (err) {
    console.error("FETCH ROOMS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch chat rooms" });
  }
});

router.patch("/room/:id/read", async (req, res) => {
  try {
    await ChatRoom.findByIdAndUpdate(req.params.id, {
      unreadForAdmin: 0,
    });

    res.sendStatus(200);
  } catch (err) {
    console.error("CLEAR UNREAD ERROR:", err);
    res.status(500).json({ message: "Failed to clear unread messages" });
  }
});

router.delete("/room/:id", async (req, res) => {
  try {
    const io = req.app.get("io");

    const room = await ChatRoom.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    await Message.deleteMany({ chatRoomId: req.params.id });
    await ChatRoom.findByIdAndDelete(req.params.id);


    io.to(req.params.id).emit("roomDeleted", req.params.id);
    io.emit("adminUnreadUpdate");

    res.json({ message: "Room deleted", id: req.params.id });
  } catch (err) {
    console.error("DELETE ROOM ERROR:", err);
    res.status(500).json({ message: "Failed to delete room" });
  }
});

module.exports = router;
