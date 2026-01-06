const volunteerDashboardStyles = {
  container: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    minHeight: "100vh",

    display: "flex",
    flexWrap: "wrap",
    alignItems: "stretch",
    justifyContent: "center",

    padding: "16px",
    boxSizing: "border-box",
    overflow: "hidden",

    backgroundImage:
      "linear-gradient(135deg, #022c22 0%, #065f46 30%, #10b981 65%, #a7f3d0 100%)",
  },

  sidebar: {
    flex: "0 0 260px",
    maxWidth: "260px",

    background: "rgba(6, 78, 59, 0.96)", 
    color: "#d1fae5",
    borderRadius: "18px",
    padding: "20px 18px",
    boxSizing: "border-box",
    boxShadow: "0 12px 30px rgba(6,78,59,0.7)",

    display: "flex",
    flexDirection: "column",
  },

  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },

  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #34d399, #22c55e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    color: "#022c22",
    fontSize: "18px",
  },

  brand: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#ecfdf5",
  },

  roleTag: {
    fontSize: "12px",
    color: "#a7f3d0",
  },

  sidebarUserBlock: {
    padding: "10px 12px",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, rgba(6,95,70,0.9), rgba(16,185,129,0.45))",
    marginBottom: "16px",
  },

  sidebarUserName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#f0fdf4",
  },

  sidebarUserEmail: {
    fontSize: "12px",
    color: "#bbf7d0",
    marginTop: "2px",
    wordBreak: "break-all",
  },

  sidebarSectionLabel: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#6ee7b7",
    marginBottom: "6px",
    paddingLeft: "2px",
  },

  navItem: {
    width: "100%",
    textAlign: "left",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(15,118,110,0.55)",
    color: "#e0f2f1",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "8px",
    transition:
      "background 0.2s ease, color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease",
  },

  navItemHover: {
    background: "rgba(52,211,153,0.35)",
    color: "#f0fdfa",
    transform: "translateX(2px)",
    boxShadow: "0 4px 10px rgba(4,120,87,0.7)",
  },

  sidebarSpacer: {
    flexGrow: 1,
  },

  logoutButton: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#b91c1c",
    color: "#fee2e2",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease",
  },

  logoutHover: {
    background: "#ef4444",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(127,29,29,0.7)",
  },

  main: {
    flex: "1 1 320px",
    marginLeft: "20px",

    borderRadius: "18px",
    background:
      "radial-gradient(circle at top left, rgba(45,212,191,0.22), transparent 55%), #f9fafb",
    padding: "24px 20px",
    boxSizing: "border-box",
    boxShadow: "0 12px 30px rgba(6,95,70,0.4)",

    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    maxHeight: "100%",
  },

  mainTitle: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#064e3b",
  },

  mainSubtitle: {
    fontSize: "15px",
    color: "#115e59",
    marginBottom: "22px",
    maxWidth: "560px",
    lineHeight: 1.6,
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },

  infoCardPrimary: {
    padding: "18px 16px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #22c55e, #14b8a6)",
    color: "#022c22",
    boxShadow: "0 8px 18px rgba(5,150,105,0.5)",
  },

  infoTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  infoText: {
    fontSize: "14px",
    lineHeight: 1.6,
  },

  // Action buttons for volunteer requests
  actionBtn: {
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    marginRight: "8px",
  },

  approveBtn: {
    background: "#16a34a",
    color: "#ffffff",
  },

  rejectBtn: {
    background: "#ef4444",
    color: "#ffffff",
  },

  deliverBtn: {
    background: "#2563eb",
    color: "#ffffff",
  },

  disabledBtn: {
    opacity: 0.65,
    cursor: "not-allowed",
  },
};

export default volunteerDashboardStyles;
