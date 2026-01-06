const victimDashboardStyles = {
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
      "linear-gradient(135deg, #0f172a 0%, #0369a1 35%, #0ea5e9 70%, #a5f3fc 100%)",
  },

  sidebar: {
    flex: "0 0 260px",
    maxWidth: "260px",

    background: "rgba(15, 23, 42, 0.96)",
    color: "#e5e7eb",
    borderRadius: "18px",
    padding: "20px 18px",
    boxSizing: "border-box",
    boxShadow: "0 12px 30px rgba(15,23,42,0.75)",

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
    background: "linear-gradient(135deg, #0ea5e9, #22c55e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    color: "#0f172a",
    fontSize: "18px",
  },

  brand: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#e5f2ff",
  },

  roleTag: {
    fontSize: "12px",
    color: "#93c5fd",
  },

  sidebarUserBlock: {
    padding: "10px 12px",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(37,99,235,0.35))",
    marginBottom: "16px",
  },

  sidebarUserName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#f9fafb",
  },

  sidebarUserEmail: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "2px",
    wordBreak: "break-all",
  },

  sidebarSectionLabel: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#6b7280",
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
    background: "rgba(15,23,42,0.45)",
    color: "#e5e7eb",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "8px",
    transition:
      "background 0.2s ease, color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease",
  },

  navItemHover: {
    background: "rgba(56,189,248,0.25)",
    color: "#f9fafb",
    transform: "translateX(2px)",
    boxShadow: "0 4px 10px rgba(8,47,73,0.7)",
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
      "radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 55%), #f9fafb",
    padding: "24px 20px",
    boxSizing: "border-box",
    boxShadow: "0 12px 30px rgba(15,23,42,0.35)",

    display: "flex",
    flexDirection: "column",
    overflowY: "auto",    
    maxHeight: "100%",
  },

  mainTitle: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#0f172a",
  },

  mainSubtitle: {
    fontSize: "15px",
    color: "#4b5563",
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
    background: "linear-gradient(135deg, #0ea5e9, #22c55e)",
    color: "#0f172a",
    boxShadow: "0 8px 18px rgba(8,47,73,0.4)",
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

export default victimDashboardStyles;
