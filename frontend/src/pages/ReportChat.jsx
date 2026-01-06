import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import socket from "../socket";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/reportChatStyles";

export default function ReportChat() {
  const { user } = useAuth();

  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();
  const [hoverReturn, setHoverReturn] = useState(false);

  const formatTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (!user) return;

    api
      .post("/chat/room", {
        userId: user._id,
        userRole: user.role,
      })
      .then((res) => setRoom(res.data))
      .catch(console.error);
  }, [user]);

  useEffect(() => {
    if (!room) return;

    socket.emit("joinRoom", room._id);

    api
      .get(`/chat/messages/${room._id}`)
      .then((res) => setMessages(res.data));

    const onReceiveMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", onReceiveMessage);

    return () => {
      socket.off("receiveMessage", onReceiveMessage);
    };
  }, [room]);

  useEffect(() => {
    const el = chatBoxRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [messages]);

  const send = async () => {
    if (!text.trim() || !room || !user) return;

    await api.post("/chat/message", {
      chatRoomId: room._id,
      senderRole: user.role,
      senderId: user._id,
      text,
    });

    setText("");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.chatBox} ref={chatBoxRef}>
        {messages.map((m) => {
          const isOwn = String(m.senderId) === String(user?._id);
          const isAdmin = m.senderRole === "admin";

          const background = isOwn
            ? "#2563eb"
            : isAdmin
            ? "#10b981"
            : "#e5e7eb";

          const color = isOwn || isAdmin ? "white" : "black";

          return (
            <div
              key={m._id}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: isOwn ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.msg,
                  background,
                  color,
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
                  padding: isOwn ? "0 6px 0 0" : "0 0 0 6px",
                }}
              >
                {formatTime(m.createdAt || m.timestamp)}
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
          placeholder="Type your message…"
        />
        <button
          style={{
            ...styles.sendButton,
            ...(!text.trim() ? styles.disabledButton : {}),
          }}
          onClick={send}
          disabled={!text.trim()}
        >
          Send
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
        <button
          onMouseEnter={() => setHoverReturn(true)}
          onMouseLeave={() => setHoverReturn(false)}
          style={{
            ...styles.returnButton,
            transform: hoverReturn ? "translateY(-2px)" : "none",
            boxShadow: hoverReturn
              ? "0 6px 18px rgba(37,99,235,0.18)"
              : "none",
            background: hoverReturn
              ? "#1e40af"
              : styles.returnButton.background,
            transition: "all 150ms ease",
          }}
          onClick={() => {
            const role = user?.role || "victim";
            if (/^admin$/i.test(role)) navigate("/admin");
            else if (/^donor$/i.test(role)) navigate("/donor");
            else if (/^volunteer$/i.test(role)) navigate("/volunteer");
            else navigate("/victim");
          }}
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
