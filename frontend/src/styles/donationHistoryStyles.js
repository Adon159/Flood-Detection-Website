const donationHistoryStyles = {
  container: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    minHeight: "100vh",
    padding: "16px",
    boxSizing: "border-box",
    overflowY: "auto",
    backgroundImage:
      "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 35%, #ffd180 70%, #fff8e1 100%)",
  },

  main: {
    maxWidth: "900px",
    margin: "0 auto",
    borderRadius: "18px",
    background:
      "radial-gradient(circle at top left, rgba(255,204,128,0.25), transparent 55%), #fffaf3",
    padding: "24px 20px",
    boxSizing: "border-box",
    boxShadow: "0 12px 30px rgba(120,63,4,0.25)",
    display: "flex",
    flexDirection: "column",
  },

  backBtn: {
    marginBottom: "18px",
    background: "none",
    border: "none",
    color: "#ef6c00",
    fontSize: "14px",
    cursor: "pointer",
    alignSelf: "flex-start",
    fontWeight: "600",
  },

  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#4e342e",
    marginBottom: "6px",
  },

  subtitle: {
    fontSize: "15px",
    color: "#6d4c41",
    marginBottom: "22px",
    lineHeight: 1.6,
  },

  card: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "16px",
    boxShadow: "0 8px 18px rgba(120,63,4,0.15)",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "520px",
  },

  th: {
    textAlign: "left",
    fontSize: "13px",
    color: "#8d6e63",
    padding: "10px 8px",
    borderBottom: "2px solid rgba(141,110,99,0.25)",
  },

  td: {
    fontSize: "13px",
    padding: "12px 8px",
    color: "#5d4037",
    borderTop: "1px solid rgba(93,64,55,0.12)",
    verticalAlign: "middle",
  },

  amount: {
    fontWeight: "700",
    color: "#4e342e",
  },

  statusBase: {
    fontWeight: "700",
    fontSize: "12px",
  },

  statusAccepted: {
    color: "#2e7d32",
  },

  statusRejected: {
    color: "#c62828",
  },

  statusPending: {
    color: "#f9a825",
  },

  emptyText: {
    marginTop: "18px",
    color: "#8d6e63",
    fontSize: "14px",
  },

  mobileHint: {
    fontSize: "12px",
    color: "#a1887f",
    marginTop: "10px",
  },
};

export default donationHistoryStyles;
