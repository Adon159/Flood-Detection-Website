const adminDashboardStyles = {
  container: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    minHeight: "100vh",

    display: "flex",
    flexWrap: "wrap",
    alignItems: "stretch",

    padding: "16px",
    boxSizing: "border-box",
    overflow: "hidden",

    backgroundImage:
      "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #334155 80%, #64748b 100%)",
  },

  sidebar: {
    flex: "0 0 260px",
    maxWidth: "260px",

    background: "rgba(15, 23, 42, 0.96)",
    color: "#e5e7eb",
    borderRadius: "18px",
    padding: "20px 18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.55)",

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
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    color: "#fff",
    fontSize: "18px",
  },

  brand: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#f1f5f9",
  },

  roleTag: {
    fontSize: "12px",
    color: "#cbd5e1",
  },

  sidebarUserBlock: {
    padding: "10px 12px",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, rgba(30,41,59,0.85), rgba(59,130,246,0.25))",
    marginBottom: "16px",
  },

  sidebarUserName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#f9fafb",
  },

  sidebarUserEmail: {
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "2px",
    wordBreak: "break-all",
  },

  sidebarSectionLabel: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#64748b",
    marginBottom: "6px",
    paddingLeft: "2px",
  },

  navItem: {
    width: "100%",
    textAlign: "left",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(30,41,59,0.55)",
    color: "#e2e8f0",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "8px",
    transition: "all 0.2s ease",
  },

  navItemHover: {
    background: "rgba(96,165,250,0.25)",
    color: "#fff",
    transform: "translateX(2px)",
    boxShadow: "0 4px 10px rgba(15,23,42,0.5)",
  },

  sidebarSpacer: {
    flexGrow: 1,
  },

  logoutButton: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "none",
    background: "#b91c1c",
    color: "#fee2e2",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
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
    background: "rgba(255,255,255,0.9)",
    padding: "24px 22px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",

    overflowY: "auto",
    maxHeight: "100%",
  },

  mainTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "8px",
  },

  mainSubtitle: {
    fontSize: "15px",
    color: "#475569",
    lineHeight: 1.6,
    maxWidth: "620px",
  },

  /* =========================
     ✅ ADDED: TABLE + CONTROLS
  ========================= */
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "16px",
  },

  th: {
    padding: "12px 10px",
    textAlign: "left",
    fontSize: "13px",
    color: "#334155",
    borderBottom: "1px solid #e2e8f0",
  },

  td: {
    padding: "10px",
    fontSize: "14px",
    color: "#0f172a",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "top",
  },

  statusBadge: {
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "capitalize",
    display: "inline-block",
  },

  statusPending: {
    background: "#fef3c7",
    color: "#92400e",
  },

  statusApproved: {
    background: "#dbeafe",
    color: "#1d4ed8",
  },

  statusDelivered: {
    background: "#dcfce7",
    color: "#166534",
  },

  statusRejected: {
    background: "#fee2e2",
    color: "#991b1b",
  },

  actionButton: {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    marginRight: "6px",
    marginBottom: "6px",
    transition: "all 0.2s ease",
  },

  approveBtn: {
    background: "#2563eb",
    color: "#fff",
  },

  deliverBtn: {
    background: "#16a34a",
    color: "#fff",
  },

  rejectBtn: {
    background: "#dc2626",
    color: "#fff",
  },

  secondaryBtn: {
    background: "#64748b",
    color: "#fff",
  },

  select: {
    width: "100%",
    padding: "6px 8px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "13px",
    background: "#f8fafc",
  },
};

export default adminDashboardStyles;
