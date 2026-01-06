const adminReliefRequestStyles = {
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
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.12)",
    overflow: "hidden",
  },

  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "16px",
    lineHeight: 1.6,
  },

  backBtn: {
    padding: "10px 16px",
    marginBottom: "18px",
    borderRadius: "10px",
    fontSize: "14px",
    background: "#1f2937",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
  },

  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#ffffff",
  },

  thead: {
    background: "#1f2937",
  },

  th: {
    padding: "14px 12px",
    textAlign: "left",
    fontSize: "13px",
    fontWeight: "700",
    color: "#ffffff",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "14px 12px",
    fontSize: "13px",
    color: "#111827",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle",
  },

  victimName: {
    fontWeight: "700",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
  },

  victimEmail: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "4px",
  },

  status: {
    fontWeight: "800",
  },

  statusPending: {
    color: "#b45309", // amber
  },

  statusApproved: {
    color: "#16a34a", // green
  },

  statusDelivered: {
    color: "#0f766e", // teal
  },

  statusRejected: {
    color: "#dc2626", // red
  },

  proofBtn: {
    padding: "8px 14px",
    borderRadius: "10px",
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
    background: "#64748b",
    color: "#ffffff",
  },

  select: {
    padding: "10px 12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "13px",
    background: "#f8fafc",
    width: "210px",
  },

  actionsWrap: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    alignItems: "center",
  },

  actionBtn: {
    padding: "9px 16px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    color: "#ffffff",
  },

  approveBtn: {
    backgroundColor: "#16a34a",
  },

  deliverBtn: {
    backgroundColor: "#15803d",
  },

  rejectBtn: {
    backgroundColor: "#ef4444",
  },

  disabledBtn: {
    opacity: 0.55,
    cursor: "not-allowed",
  },
};

export default adminReliefRequestStyles;
