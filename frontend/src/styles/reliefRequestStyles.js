const reliefRequestStyles = {
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

    // 🔵 Blue → Green background like dashboard
    background:
      "linear-gradient(135deg, #0f3c5f 0%, #0ea5a4 50%, #22c55e 100%)",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    borderRadius: "18px",
    padding: "26px",
    boxSizing: "border-box",

    // soft glassy white-blue card
    background:
      "radial-gradient(circle at top left, rgba(14,165,164,0.18), transparent 55%), #f8fdff",

    boxShadow: "0 16px 40px rgba(15,60,95,0.35)",
  },

  title: {
    fontSize: "24px",
    fontWeight: 600,
    color: "#0f3c5f", // deep blue
    textAlign: "center",
    marginBottom: "8px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#0ea5a4", // teal
    textAlign: "center",
    marginBottom: "20px",
  },

  label: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#14532d", // dark green
    marginBottom: "6px",
    display: "block",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "14px",
    borderRadius: "12px",
    border: "1px solid #99d9d4",

    fontSize: "14px",
    background: "#f1fbfb",
    color: "#0f3c5f",

    outline: "none",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "14px",
    borderRadius: "12px",
    border: "1px solid #99d9d4",

    fontSize: "14px",
    background: "#f1fbfb",
    color: "#0f3c5f",

    outline: "none",
    resize: "none",
    minHeight: "90px",
    boxSizing: "border-box",
  },

  select: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "14px",
    borderRadius: "12px",
    border: "1px solid #99d9d4",

    fontSize: "14px",
    background: "#f1fbfb",
    color: "#0f3c5f",

    outline: "none",
    boxSizing: "border-box",
  },

  fileInput: {
    width: "100%",
    marginBottom: "18px",
    fontSize: "13px",
    color: "#0f766e", // teal text
  },

  button: {
    width: "100%",
    padding: "13px",
    borderRadius: "14px",
    border: "none",

    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    color: "#ffffff",

    // 🔵 Blue → Green CTA button
    background:
      "linear-gradient(90deg, #0ea5a4 0%, #22c55e 100%)",

    boxShadow: "0 10px 26px rgba(34,197,94,0.45)",
  },
};

export default reliefRequestStyles;
