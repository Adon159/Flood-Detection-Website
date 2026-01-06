const profileStyles = {
  container: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background:
      "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 35%, #a5f3fc 80%)",

    overflow: "hidden",
    padding: "20px",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "680px",
    padding: "26px 26px 32px 26px",
    borderRadius: "18px",

    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 14px 32px rgba(15,23,42,0.18)",
    boxSizing: "border-box",
  },

  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  avatar: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #0ea5e9, #22c55e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "700",
    color: "#0f172a",
  },

  name: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#0f172a",
  },

  email: {
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "4px",
  },

  chipRow: {
    display: "flex",
    gap: "6px",
    marginTop: "4px",
  },

  roleChip: {
    padding: "4px 10px",
    borderRadius: "999px",
    background: "rgba(37,99,235,0.12)",
    color: "#1d4ed8",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  statusChipBase: {
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  statusActive: {
    background: "rgba(22,163,74,0.12)",
    color: "#15803d",
  },

  statusDeactive: {
    background: "rgba(220,38,38,0.12)",
    color: "#b91c1c",
  },

  divider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "18px 0",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginBottom: "24px",
  },

  infoItem: {
    padding: "12px 14px",
    borderRadius: "12px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
  },

  infoLabel: {
    fontSize: "12px",
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: "4px",
  },

  infoValue: {
    fontSize: "15px",
    color: "#111827",
  },

  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
  },

  backButton: {
    flex: 1,
    padding: "12px",
    background: "#64748b",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.25s ease",
  },

  backHover: {
    background: "#475569",
    transform: "translateY(-2px)",
  },

  button: {
    flex: 1,
    padding: "12px",
    background: "#0284c7",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.25s ease",
  },

  buttonHover: {
    background: "#0369a1",
    transform: "translateY(-2px)",
  },
};

export default profileStyles;
