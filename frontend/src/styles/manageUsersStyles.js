const manageUsersStyles = {
  container: {
    padding: "24px",
    background: "rgba(255,255,255,0.95)",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    maxWidth: "1100px",
    margin: "0 auto",
    overflowX: "auto",
  },

  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "20px",
  },

  /* ----------- Table Styles ----------- */

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  },

  th: {
    padding: "12px",
    background: "#1e293b",
    color: "white",
    textAlign: "left",
    fontSize: "14px",
  },

  tr: {
    borderBottom: "1px solid #e2e8f0",
    transition: "background 0.2s ease",
  },

  trHover: {
    background: "#f1f5f9",
  },

  td: {
    padding: "12px",
    fontSize: "14px",
    color: "#334155",
  },

  actionTd: {
    padding: "12px",
    display: "flex",
    gap: "8px",
  },

  /* ----------- Action Buttons ----------- */

  activateBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.2s ease",
  },

  deactivateBtn: {
    background: "#eab308",
    color: "#000",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.2s ease",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.2s ease",
  },

  /* Hover Effects */
  activateBtnHover: {
    background: "#15803d",
  },

  deactivateBtnHover: {
    background: "#ca8a04",
  },

  deleteBtnHover: {
    background: "#b91c1c",
  },

  /* ----------- Loading ----------- */

  loading: {
    fontSize: "18px",
    color: "#475569",
    textAlign: "center",
    marginTop: "40px",
  },

  /* ----------- Back Button ----------- */

  backBtn: {
    padding: "10px 14px",
    marginBottom: "15px",
    borderRadius: "8px",
    fontSize: "14px",
    background: "#374151",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "0.25s ease",
    display: "inline-block",
  },

  backBtnHover: {
    background: "#1f2937",
    transform: "translateY(-1px)",
  },
};

export default manageUsersStyles;
