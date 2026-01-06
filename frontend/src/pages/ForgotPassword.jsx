import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

import styles from "../styles/forgotPasswordStyles";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();

  const [btnHover, setBtnHover] = useState(false);
  const [resetHover, setResetHover] = useState(false);
  const [backHover, setBackHover] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/send-otp", { email });
      setMsg(res.data.message || "OTP sent to your email");
      setSent(true);
      setCountdown(5);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sent) return;
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(t);
          navigate("/reset-password");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [sent, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>

        {msg && !sent && <p style={styles.successText}>{msg}</p>}
        {error && <p style={styles.errorText}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(btnHover ? styles.buttonHover : {}),
              ...(loading ? styles.buttonDisabled : {}),
            }}
            onMouseEnter={() => !loading && setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
        {sent && (
          <p style={styles.successText}>
            {msg || "OTP sent to your email."} Redirecting to reset password in {countdown}s...
          </p>
        )}

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

export default ForgotPassword;
