import bg from "../assets/Flood Background.jpg";

const registerStyles = {
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
    maxWidth: "460px",
    background: "rgba(255, 255, 255, 0.92)",
    padding: "35px 30px",
    borderRadius: "12px",
    boxShadow: "0 5px 18px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backdropFilter: "blur(4px)",
  },

  title: {
    marginBottom: "20px",
    color: "#333",
    fontSize: "24px",
    fontWeight: "600",
  },

  form: {
    width: "100%",
    marginTop: "10px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    marginBottom: "14px",
  },

  select: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    marginBottom: "18px",
    backgroundColor: "#fff",
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
    fontSize: "14px",
    marginBottom: "8px",
  },

  loginWrapper: {
    marginTop: "16px",
  },

  loginLink: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "0.25s ease",
  },

  loginLinkHover: {
    color: "#005bb5",
    textDecoration: "underline",
  },
};

export default registerStyles;
