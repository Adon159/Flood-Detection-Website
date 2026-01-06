import { useEffect, useState } from "react";
import styles from "../styles/adminAnalyticsStyles";

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/admin/analytics");
      if (!res.ok) throw new Error(`Failed to fetch analytics: ${res.status}`);
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error("Failed to load analytics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const formatAmount = (amount) =>
    amount == null ? "0" : new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(amount);

  const downloadCSV = () => {
    const rows = [
      ["Metric", "Value"],
      ["Victims Helped", analytics?.victimsHelped ?? 0],
      ["Pending Requests", analytics?.pendingRequests ?? 0],
      ["Donations - Total Amount (Tk)", analytics?.donations?.totalAmount ?? 0],
      ["Donations - Total Donations", analytics?.donations?.totalDonations ?? 0],
      ["Resources - Total Stock", analytics?.resources?.totalStock ?? 0],
      ["Resources - Distributed", analytics?.resources?.distributed ?? 0],
    ];

    const csv = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <p style={styles.loading}>Loading analytics...</p>;
  }

  if (!analytics) {
    return <p style={styles.error}>Failed to load analytics.</p>;
  }

  return (
    <div style={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={styles.title}>Admin Analytics Dashboard</h1>
        <button style={styles.downloadBtn} onClick={downloadCSV}>Download Report</button>
      </div>

      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Victims Helped</h2>
          <p style={styles.cardValue}>{analytics.victimsHelped}</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Pending Requests</h2>
          <p style={styles.cardValue}>{analytics.pendingRequests}</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Donations</h2>
          <p style={styles.cardValue}>
            Total Amount: Tk {formatAmount(analytics.donations?.totalAmount)}<br />
            Total Donations: {analytics.donations?.totalDonations ?? 0}
          </p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Resources</h2>
          <p style={styles.cardValue}>
            Total Stock: {analytics.resources.totalStock}<br />
            Distributed: {analytics.resources.distributed}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;