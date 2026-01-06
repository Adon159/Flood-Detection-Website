const isMobile =
  typeof window !== "undefined" && window.innerWidth <= 768;

const adminChatStyles = {
  /* =========================
     MAIN LAYOUT
  ========================== */
  layout: {
    maxWidth: isMobile ? "100%" : 1200,
    height: isMobile ? "100vh" : "calc(100vh - 100px)",
    margin: isMobile ? 0 : "24px auto",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 0 : 16,
    overflow: "hidden",
  },

  /* =========================
     SIDEBAR (ROOM LIST)
  ========================== */
  roomList: {
    width: isMobile ? "100%" : 300,
    height: isMobile ? 80 : "auto",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    borderRadius: isMobile ? 0 : 16,
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: isMobile ? "row" : "column",
    overflowX: isMobile ? "auto" : "hidden",
    overflowY: "hidden",
  },

  roomItem: {
    padding: 12,
    cursor: "pointer",
    borderBottom: isMobile ? "none" : "1px solid #e5e7eb",
    borderRight: isMobile ? "1px solid #e5e7eb" : "none",
    minWidth: isMobile ? 140 : "auto",
    textAlign: isMobile ? "center" : "left",
    transition: "background 120ms ease",
  },

  roomItemActive: {
    background: "#e5e7eb",
  },

  roomHeader: {
    padding: 14,
    fontWeight: 600,
    borderBottom: "1px solid #e5e7eb",
    display: isMobile ? "none" : "block",
  },

  sidebarFooter: {
    marginTop: "auto",
    padding: 12,
    borderTop: "1px solid #e5e7eb",
    display: isMobile ? "none" : "block",
  },

  /* =========================
     CHAT PANEL
  ========================== */
  chatPanel: {
    flex: 1,
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: isMobile ? 0 : 16,
    boxShadow: "0 20px 40px rgba(15,23,42,0.12)",
    padding: isMobile ? 12 : 16,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  chatBox: {
    flex: 1,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: isMobile ? 12 : 16,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  /* =========================
     MESSAGE BUBBLES
  ========================== */
  msg: {
    maxWidth: isMobile ? "85%" : "65%",
    padding: "10px 14px",
    borderRadius: 16,
    fontSize: isMobile ? 13 : 13.5,
    lineHeight: 1.45,
    wordBreak: "break-word",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  /* =========================
     INPUT AREA
  ========================== */
  inputRow: {
    display: "flex",
    gap: isMobile ? 8 : 10,
    marginTop: 12,
    padding: isMobile ? 8 : 10,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    flexShrink: 0,
  },

  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: isMobile ? 14 : 13.5,
    outline: "none",
  },

  sendButton: {
    padding: isMobile ? "10px 14px" : "8px 16px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "#ffffff",
    fontSize: 13,
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(37,99,235,0.3)",
  },

  deleteButton: {
    padding: isMobile ? "10px 14px" : "8px 16px",
    borderRadius: 12,
    border: "none",
    background: "#dc2626",
    color: "#ffffff",
    fontSize: 13,
    cursor: "pointer",
  },

  /* =========================
     RETURN BUTTON
  ========================== */
  returnButton: {
    width: "100%",
    padding: isMobile ? "12px" : "10px",
    borderRadius: 12,
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: 13.5,
    fontWeight: 500,
    cursor: "pointer",
  },
};

export default adminChatStyles;
