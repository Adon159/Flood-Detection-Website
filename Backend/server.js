const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const reliefResourceRoutes = require("./routes/reliefResourceRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

const isDev = process.env.NODE_ENV !== "production";

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:4000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
].filter(Boolean);

if (isDev) {
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error("CORS policy: origin not allowed"));
      },
      credentials: true,
    })
  );
}

app.use("/api", reliefResourceRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api", require("./routes/adminAnalyticsRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api", require("./routes/usercontrol"));
app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/relief", require("./routes/reliefRequestRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

app.use("/uploads", express.static("uploads"));

// Serve static files from the React frontend app
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Anything that doesn't match the above routes, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  if (err && (err.name === "MulterError" || err.code === "LIMIT_FILE_SIZE")) {
    return res.status(400).json({ message: err.message || "File upload error" });
  }

  if (res.headersSent) return next(err);
  res.status(500).json({ message: "Server error" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: isDev
    ? { origin: true, credentials: true }
    : { origin: allowedOrigins, credentials: true },
});


app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server running with Socket.IO on port ${PORT}`)
);
