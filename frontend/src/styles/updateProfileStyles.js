const updateProfileStyles = {
  container: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 35%, #a5f3fc 80%)",
    padding: "16px",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  card: {
    width: "min(640px, 100%)",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    padding: "24px 20px",
    borderRadius: "20px",
    boxShadow: "0 16px 40px rgba(15,23,42,0.25)",
    boxSizing: "border-box",
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "left",
    marginBottom: "18px",
    color: "#0f172a",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    width: "100%",
    padding: "11px 13px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  select: {
    width: "100%",
    padding: "11px 13px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    background: "#fff",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  buttonRow: {
    display: "flex",
    flexWrap: "wrap",      
    gap: "10px",
    marginTop: "14px",
  },

  backButton: {
    flex: "1 1 140px",
    padding: "11px",
    borderRadius: "10px",
    background: "#64748b",
    color: "#fff",
    border: "none",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "center",
    transition: "0.25s ease",
  },

  backHover: {
    background: "#475569",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 10px rgba(15,23,42,0.35)",
  },

  button: {
    flex: "1 1 140px",
    padding: "11px",
    borderRadius: "10px",
    background: "#0284c7",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
    transition: "0.25s ease",
  },

  buttonHover: {
    background: "#0369a1",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 10px rgba(3,105,161,0.4)",
  },
};

export default updateProfileStyles;
