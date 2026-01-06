import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

import styles from "../styles/resetPasswordStyles"; 

const ResetPassword = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(0);

  const [btnHover, setBtnHover] = useState(false);
  const [backHover, setBackHover] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setCounter(0);

    try {
      const res = await api.post("/auth/reset-password", form);
      setMsg(res.data.message || "Password updated successfully!");
      setCounter(1); // start countdown
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  useEffect(() => {
    if (!msg || counter === 0) return;

    if (counter > 5) {
      navigate("/login");
      return;
    }

    const timerId = setTimeout(() => {
      setCounter((c) => c + 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [counter, msg, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>

        {msg && (
          <>
            <p style={styles.successText}>{msg}</p>
            <p style={styles.countdownText}>
              Redirecting to login... {counter} / 5
            </p>
          </>
        )}

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
            name="otp"
            placeholder="OTP"
            value={form.otp}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={form.newPassword}
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
            Update Password
          </button>
        </form>

        <div style={styles.fullWidthLinkWrapper}>
          <Link
            to="/login"
            style={{
              ...styles.backLink,
              ...(backHover ? styles.backLinkHover : {}),
            }}
            onMouseEnter={() => setBackHover(true)}
            onMouseLeave={() => setBackHover(false)}
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

