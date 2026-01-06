const makeDonationStyles = {
  page: {
    position: "fixed",
    inset: 0,

    width: "100%", 
    minHeight: "100vh",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: "16px",
    boxSizing: "border-box",

    overflowX: "hidden",
    overflowY: "auto",

    backgroundImage:
      "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 35%, #ffd180 70%, #fff8e1 100%)",
  },

  card: {
    width: "100%",
    maxWidth: "520px",
    minWidth: 0,

    borderRadius: "18px",
    padding: "24px",
    boxSizing: "border-box",

    background:
      "radial-gradient(circle at top left, rgba(255,204,128,0.25), transparent 55%), #fffaf3",

    boxShadow: "0 14px 36px rgba(120,63,4,0.25)",
  },

  title: {
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "6px",
    color: "#4e342e",
    wordBreak: "break-word",
  },

  subtitle: {
    fontSize: "14px",
    color: "#6d4c41",
    marginBottom: "28px",
    lineHeight: 1.6,
  },

  formGroup: {
    marginBottom: "16px",
  },

  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: 600,
    fontSize: "14px",
    color: "#4e342e",
  },

  input: {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",

    padding: "11px 14px",
    borderRadius: "10px",
    border: "1px solid #e0c9a6",

    fontSize: "14px",
    background: "#fffef9",
    outline: "none",

    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  },

  inputFocus: {
    borderColor: "#ffb300",
    boxShadow: "0 0 0 3px rgba(255,179,0,0.25)",
  },

  select: {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",

    padding: "11px 14px",
    borderRadius: "10px",
    border: "1px solid #e0c9a6",

    fontSize: "14px",
    background: "#fffef9",
    outline: "none",
    cursor: "pointer",
  },

  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",

    justifyContent: "space-between",
    alignItems: "center",

    marginTop: "26px",
  },

  backButton: {
    flex: "1 1 180px",

    background: "rgba(255,183,77,0.25)",
    border: "1px solid #e0c9a6",

    padding: "11px 18px",
    borderRadius: "10px",

    cursor: "pointer",
    color: "#4e342e",
    fontSize: "14px",
    fontWeight: 500,
    textAlign: "center",

    transition: "background 0.2s ease, box-shadow 0.2s ease",
  },

  backButtonHover: {
    background: "rgba(255,183,77,0.45)",
    boxShadow: "0 4px 10px rgba(255,143,0,0.35)",
  },

  submitButton: {
    flex: "1 1 180px",

    background: "linear-gradient(135deg, #ffb300, #ff7043)",
    color: "#4e342e",

    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",

    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
    textAlign: "center",

    boxShadow: "0 8px 18px rgba(255,140,0,0.45)",
    transition: "transform 0.15s ease, box-shadow 0.2s ease",
  },

  submitButtonHover: {
    transform: "translateY(-1px)",
    boxShadow: "0 12px 26px rgba(255,140,0,0.6)",
  },
};

export default makeDonationStyles;
