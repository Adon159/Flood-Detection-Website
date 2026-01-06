const donorDashboardStyles = {
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
      "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 35%, #ffd180 70%, #fff8e1 100%)",
  },

  sidebar: {
    flex: "0 0 260px",
    maxWidth: "260px",

    background: "rgba(66, 33, 11, 0.96)",
    color: "#f5e9d3",
    borderRadius: "18px",
    padding: "20px 18px",
    boxSizing: "border-box",
    boxShadow: "0 12px 30px rgba(120, 63, 4, 0.45)",

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
    background: "linear-gradient(135deg, #ffb300, #ff7043)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    color: "#442100",
    fontSize: "18px",
  },

  brand: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#fff3e0",
  },

  roleTag: {
    fontSize: "12px",
    color: "#ffe0b2",
  },

  sidebarUserBlock: {
    padding: "10px 12px",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, rgba(255,171,64,0.25), rgba(255,112,67,0.35))",
    marginBottom: "16px",
  },

  sidebarUserName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff7ed",
  },

  sidebarUserEmail: {
    fontSize: "12px",
    color: "#f0d9c2",
    marginTop: "2px",
    wordBreak: "break-all",
  },

  sidebarSectionLabel: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#e7c9a9",
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
    background: "rgba(255,255,255,0.05)",
    color: "#ffe8c7",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "8px",
    transition:
      "background 0.2s ease, color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease",
  },

  navItemHover: {
    background: "rgba(255,183,77,0.35)",
    color: "#fffef9",
    transform: "translateX(2px)",
    boxShadow: "0 4px 10px rgba(255,143,0,0.45)",
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
    background: "#c62828",
    color: "#fee2e2",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease",
  },

  logoutHover: {
    background: "#b71c1c",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(183,28,28,0.7)",
  },

  main: {
    flex: "1 1 320px",
    marginLeft: "20px",

    borderRadius: "18px",
    background:
      "radial-gradient(circle at top left, rgba(255,204,128,0.25), transparent 55%), #fffaf3",
    padding: "24px 20px",
    boxSizing: "border-box",
    boxShadow: "0 12px 30px rgba(120,63,4,0.25)",

    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    maxHeight: "100%",
  },

  mainTitle: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#4e342e",
  },

  mainSubtitle: {
    fontSize: "15px",
    color: "#6d4c41",
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
    background: "linear-gradient(135deg, #ffb300, #ff7043)",
    color: "#4e342e",
    boxShadow: "0 8px 18px rgba(255,140,0,0.45)",
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
};

export default donorDashboardStyles;
