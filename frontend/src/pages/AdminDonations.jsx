import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import styles from "../styles/adminDonationStyles";

const AdminDonations = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);

  const fetchDonations = async () => {
    const res = await axios.get("/donations/admin");
    setDonations(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`/donations/admin/${id}`, { status });
    fetchDonations();
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Donation Control Panel</h2>

        <button
          style={styles.backBtn}
          onClick={() => navigate("/admin")}
        >
          ← Return to Dashboard
        </button>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Method</th>
                <th style={styles.th}>Transaction ID</th>
                <th style={styles.th}>Status</th>

                <th style={{ ...styles.th, textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {donations.map((d) => (
                <tr key={d._id}>
                  <td style={styles.td}>{d.donor?.name}</td>
                  <td style={styles.td}>{d.donor?.email}</td>
                  <td style={styles.td}>৳ {d.amount}</td>
                  <td style={styles.td}>{d.method}</td>
                  <td style={styles.td}>{d.transactionId}</td>

                  <td
                    style={{
                      ...styles.td,
                      ...styles.status,
                      ...(d.status === "Accepted"
                        ? styles.statusAccepted
                        : styles.statusRejected),
                    }}
                  >
                    {d.status}
                  </td>

                  <td style={styles.actionCell}>
                    <div style={styles.actionTd}>
                      <button
                        style={{
                          ...styles.actionBtn,
                          ...styles.acceptBtn,
                          ...(d.status === "Accepted"
                            ? styles.disabledBtn
                            : {}),
                        }}
                        disabled={d.status === "Accepted"}
                        onClick={() =>
                          updateStatus(d._id, "Accepted")
                        }
                      >
                        Accept
                      </button>

                      <button
                        style={{
                          ...styles.actionBtn,
                          ...styles.rejectBtn,
                          ...(d.status === "Rejected"
                            ? styles.disabledBtn
                            : {}),
                        }}
                        disabled={d.status === "Rejected"}
                        onClick={() =>
                          updateStatus(d._id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {donations.length === 0 && (
            <p style={{ marginTop: 16 }}>
              No donations found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDonations;
