import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

import styles from "../styles/loginStyles";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [linkHoverForgot, setLinkHoverForgot] = useState(false);
  const [linkHoverRegister, setLinkHoverRegister] = useState(false);

  const params = new URLSearchParams(location.search);
  const registered = params.get("registered") === "1";
  const successMsg = registered ? "Registration successful! Please login." : "";

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token, res.data.user);

      localStorage.setItem("userId", res.data.user.id);

      const role = res.data.user.role || "";
      if (/^admin$/i.test(role)) navigate("/admin");
      else if (/^donor$/i.test(role)) navigate("/donor");
      else if (/^volunteer$/i.test(role)) navigate("/volunteer");
      else navigate("/victim");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        {successMsg && <p style={styles.successText}>{successMsg}</p>}
        {error && <p style={styles.errorText}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(btnHover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            Login
          </button>
        </form>

        <div style={styles.linksBox}>
          <Link
            to="/forgot-password"
            style={{
              ...styles.link,
              ...(linkHoverForgot ? styles.linkHover : {}),
            }}
            onMouseEnter={() => setLinkHoverForgot(true)}
            onMouseLeave={() => setLinkHoverForgot(false)}
          >
            Forgot password?
          </Link>

          <Link
            to="/register"
            style={{
              ...styles.link,
              ...(linkHoverRegister ? styles.linkHover : {}),
            }}
            onMouseEnter={() => setLinkHoverRegister(true)}
            onMouseLeave={() => setLinkHoverRegister(false)}
          >
            New user? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
