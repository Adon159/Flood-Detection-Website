const reportChatStyles = {
  /* =========================
     MAIN CONTAINER
  ========================== */
  wrapper: {
    maxWidth: 900,

    /* 🔴 KEY FIX: account for header / layout */
    height: "calc(100vh - 120px)",
    overflow: "hidden",

    margin: "24px auto",
    padding: 16,

    background: "#f1f5f9",
    border: "1px solid #e2e8f0",

    borderRadius: 16,
    boxShadow: "0 20px 40px rgba(15,23,42,0.12)",
    display: "flex",
    flexDirection: "column",
  },

  /* =========================
     CHAT AREA (ONLY SCROLL)
  ========================== */
  chatBox: {
    flex: 1,
    overflowY: "auto",

    padding: 16,
    background: "#ffffff",
    border: "1px solid #e5e7eb",

    borderRadius: 14,
    boxShadow: "inset 0 1px 4px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  /* =========================
     MESSAGE BUBBLES
  ========================== */
  msg: {
    maxWidth: "65%",
    padding: "10px 14px",
    borderRadius: 16,
    fontSize: 13.5,
    lineHeight: 1.45,
    wordBreak: "break-word",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  /* =========================
     INPUT AREA
  ========================== */
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,

    marginTop: 12,
    padding: 10,

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
    fontSize: 13.5,
    outline: "none",
    background: "#ffffff",
  },

  /* =========================
     SEND BUTTON
  ========================== */
  sendButton: {
    padding: "8px 16px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "#ffffff",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(37,99,235,0.3)",
  },

  disabledButton: {
    opacity: 0.45,
    cursor: "not-allowed",
    boxShadow: "none",
  },

  /* =========================
     RETURN BUTTON
  ========================== */
  returnButton: {
    marginTop: 10,
    alignSelf: "flex-end",

    padding: "8px 16px",
    borderRadius: 12,
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    flexShrink: 0,
  },
};

export default reportChatStyles;
