import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import styles from "../styles/makeDonationStyles";

const paymentInfo = {
  Bkash: "Bkash Personal: 01711-000000",
  Nagad: "Nagad Personal: 01811-000000",
  Rocket: "Rocket: 01911-000000",
  Bank: "Bank A/C: 123456789 | Branch: BRAC Bank",
};

const MakeDonation = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [btnHover, setBtnHover] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/donations", {
        amount: Number(amount),
        method,
        accountNumber,
        transactionId,
      });

      alert("Donation submitted successfully! Awaiting verification.");
      navigate("/donor");
    } catch (err) {
      alert(err.response?.data?.message || "Donation failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Make a Donation</h1>
        <p style={styles.subtitle}>
          Your generosity helps flood-affected families with food, shelter, and
          emergency medical support.
        </p>
        <div
          style={{
            marginBottom: 24,
            padding: "14px 16px",
            borderRadius: 12,
            background: "rgba(255,183,77,0.25)",
            color: "#4e342e",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          <strong>Send money via {method}</strong>
          <br />
          <span>{paymentInfo[method]}</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Donation Amount (৳)</label>
            <input
              type="number"
              placeholder="e.g. 500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Payment Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              style={styles.select}
            >
              <option>Bkash</option>
              <option>Nagad</option>
              <option>Rocket</option>
              <option>Bank</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Your Account / Wallet Number
            </label>
            <input
              type="text"
              placeholder="Your sending number / account"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Transaction ID</label>
            <input
              type="text"
              placeholder="e.g. A7X9P3K"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.buttonRow}>
            <button
              type="button"
              onClick={() => navigate("/donor")}
              style={styles.backButton}
            >
              ← Back to Dashboard
            </button>

            <button
              type="submit"
              style={{
                ...styles.submitButton,
                ...(btnHover ? styles.submitButtonHover : {}),
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              Donate Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeDonation;
