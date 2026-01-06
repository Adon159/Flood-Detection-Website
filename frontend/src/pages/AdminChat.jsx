import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import socket from "../socket";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/adminChatStyles";

export default function AdminChat() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();
  const [hoverReturnAdmin, setHoverReturnAdmin] = useState(false);

  const formatTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const loadRooms = () => {
    api
      .get("/chat/admin/rooms")
      .then((res) => setRooms(res.data || []))
      .catch(console.error);
  };

  useEffect(() => {
    loadRooms();
    socket.on("adminUnreadUpdate", loadRooms);
    return () => socket.off("adminUnreadUpdate");
  }, []);

  const openRoom = async (room) => {
    if (!room?._id) return;

    setActiveRoom(room);
    socket.emit("joinRoom", room._id);

    await api.patch(`/chat/room/${room._id}/read`);
    loadRooms();

    const res = await api.get(`/chat/messages/${room._id}`);
    setMessages(res.data || []);

    requestAnimationFrame(() => {
      const el = chatBoxRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  };

  useEffect(() => {
    if (!activeRoom?._id) return;

    const onReceiveMessage = (msg) => {
      if (msg.chatRoomId === activeRoom._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const onRoomDeleted = (roomId) => {
      if (roomId === activeRoom._id) {
        setRooms((prev) => prev.filter((r) => r._id !== roomId));
        setActiveRoom(null);
        setMessages([]);
      }
    };

    socket.on("receiveMessage", onReceiveMessage);
    socket.on("roomDeleted", onRoomDeleted);

    return () => {
      socket.off("receiveMessage", onReceiveMessage);
      socket.off("roomDeleted", onRoomDeleted);
    };
  }, [activeRoom]);

  useEffect(() => {
    const el = chatBoxRef.current;
    if (!el) return;

    const distanceFromBottom =
      el.scrollHeight - (el.scrollTop + el.clientHeight);

    if (distanceFromBottom < 120) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [messages]);

  const send = async () => {
    if (!text.trim() || !activeRoom || !user) return;

    await api.post("/chat/message", {
      chatRoomId: activeRoom._id,
      senderRole: "admin",
      senderId: user._id,
      text,
    });

    setText("");
  };

  return (
    <div style={styles.layout}>
      <div style={styles.roomList}>
        <div style={styles.roomHeader}>Report Chats</div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {rooms.map((r) => {
            const isActive = activeRoom?._id === r._id;
            return (
              <div
                key={r._id}
                onClick={() => openRoom(r)}
                style={{
                  ...styles.roomItem,
                  ...(isActive ? styles.roomItemActive : {}),
                }}
              >
                <strong>{r.userRole?.toUpperCase()}</strong>
                <div style={{ fontSize: 12, color: "#475569" }}>
                  {r.userName}
                </div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  {r.userEmail}
                </div>
                {r.unreadForAdmin > 0 && (
                  <div style={{ fontSize: 12, color: "#dc2626" }}>
                    Unread: {r.unreadForAdmin}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={styles.sidebarFooter}>
          <button
            onMouseEnter={() => setHoverReturnAdmin(true)}
            onMouseLeave={() => setHoverReturnAdmin(false)}
            style={{
              ...styles.returnButton,
              transform: hoverReturnAdmin ? "translateY(-2px)" : "none",
              boxShadow: hoverReturnAdmin
                ? "0 6px 18px rgba(37,99,235,0.18)"
                : "none",
              background: hoverReturnAdmin
                ? "#1e40af"
                : styles.returnButton.background,
              transition: "all 150ms ease",
            }}
            onClick={() => navigate("/admin")}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
      <div style={styles.chatPanel}>
        {activeRoom ? (
          <>
            <h3 style={{ marginBottom: 10 }}>
              Chat with {activeRoom.userRole}
            </h3>

            <div ref={chatBoxRef} style={styles.chatBox}>
              {messages.map((m) => {
                const isOwn =
                  String(m.senderId) === String(user?._id);

                return (
                  <div
                    key={m._id}
                    style={{
                      display: "flex",
                      justifyContent: isOwn
                        ? "flex-end"
                        : "flex-start",
                      width: "100%",
                    }}
                  >
                    <div style={{ maxWidth: "85%" }}>
                      <div
                        style={{
                          ...styles.msg,
                          background: isOwn
                            ? "#2563eb"
                            : "#10b981",
                          color: "#ffffff",
                        }}
                      >
                        {m.text}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          marginTop: 4,
                          color: "#6b7280",
                          textAlign: isOwn ? "right" : "left",
                          padding: isOwn
                            ? "0 6px 0 0"
                            : "0 0 0 6px",
                        }}
                      >
                        {formatTime(m.createdAt || m.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={styles.inputRow}>
              <input
                style={styles.input}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Reply to user..."
              />
              <button
                style={styles.sendButton}
                onClick={send}
                disabled={!text.trim()}
              >
                Send
              </button>
              <button
                style={styles.deleteButton}
                onClick={async () => {
                  if (!activeRoom?._id) return;
                  if (
                    !confirm(
                      "Delete this chat? This will remove all messages."
                    )
                  )
                    return;

                  await api.delete(
                    `/chat/room/${activeRoom._id}`
                  );
                  setRooms((prev) =>
                    prev.filter(
                      (r) => r._id !== activeRoom._id
                    )
                  );
                  setActiveRoom(null);
                  setMessages([]);
                }}
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <p>Select a chat to start</p>
        )}
      </div>
    </div>
  );
}
