const adminDonationStyles = {

  page: {
    position: "fixed",      
    inset: 0,                
    width: "100vw",
    height: "100vh",
    background: "#f1f5f9",
    overflow: "hidden",      
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  card: {
    width: "100%",
    maxWidth: "1200px",
    marginTop: "24px",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "12px",
  },

  backBtn: {
    padding: "8px 14px",
    marginBottom: "16px",
    borderRadius: "8px",
    fontSize: "13px",
    background: "#1f2937",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
  },

  tableWrapper: {
    width: "100%",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "collapse",
  },

  thead: {
    background: "#1f2937",
  },

  th: {
    padding: "12px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "left",
  },

  td: {
    padding: "12px",
    fontSize: "13px",
    color: "#111827",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle",
  },

  status: {
    fontWeight: "700",
  },

  statusAccepted: {
    color: "#16a34a",
  },

  statusRejected: {
    color: "#dc2626",
  },

  actionCell: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "center",
    verticalAlign: "middle",
  },

  actionTd: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  },

  actionBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
  },

  acceptBtn: {
    backgroundColor: "#16a34a",
    color: "#ffffff",
  },

  rejectBtn: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
  },

  disabledBtn: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

export default adminDonationStyles;
