// src/styles/loginStyles.js
import bg from "../assets/Flood Background.jpg";

const loginStyles = {
  container: {
    position: "fixed",
    inset: 0,
    minHeight: "100vh",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    padding: "20px",
    overflow: "auto",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255, 255, 255, 0.92)",
    padding: "35px 30px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    backdropFilter: "blur(4px)",
  },

  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "20px",
  },

  form: {
    width: "100%",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    marginBottom: "14px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    background: "#007bff",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "0.25s ease",
  },

  buttonHover: {
    background: "#0066d6",
    boxShadow: "0 4px 10px rgba(0, 102, 214, 0.35)",
    transform: "translateY(-1px)",
  },

  errorText: {
    color: "#e3342f",
    marginBottom: "8px",
    fontSize: "14px",
  },

  successText: {
    color: "#1f9d55",
    marginBottom: "8px",
    fontSize: "14px",
  },

  linksBox: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  link: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "14px",
    transition: "0.25s ease",
  },

  linkHover: {
    color: "#005bb5",
    textDecoration: "underline",
  },
};

export default loginStyles;
