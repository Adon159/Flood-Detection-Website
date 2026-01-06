import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import donationHistoryStyles from "../styles/donationHistoryStyles";

const DonationHistory = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    api.get("/donations/my").then((res) => setDonations(res.data));
  }, []);

  return (
    <div style={donationHistoryStyles.container}>
      <main style={donationHistoryStyles.main}>
        <button
          onClick={() => navigate("/donor")}
          style={donationHistoryStyles.backBtn}
        >
          ← Back to Dashboard
        </button>


        <h1 style={donationHistoryStyles.title}>Donation History</h1>
        <p style={donationHistoryStyles.subtitle}>
          Review your past donations and their approval status.
        </p>


        <div style={donationHistoryStyles.card}>
          <table style={donationHistoryStyles.table}>
            <thead>
              <tr>
                <th style={donationHistoryStyles.th}>Date</th>
                <th style={donationHistoryStyles.th}>Amount</th>
                <th style={donationHistoryStyles.th}>Method</th>
                <th style={donationHistoryStyles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {donations.map((d) => (
                <tr key={d._id}>
                  <td style={donationHistoryStyles.td}>
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>

                  <td
                    style={{
                      ...donationHistoryStyles.td,
                      ...donationHistoryStyles.amount,
                    }}
                  >
                    ৳ {d.amount}
                  </td>

                  <td style={donationHistoryStyles.td}>{d.method}</td>

                  <td
                    style={{
                      ...donationHistoryStyles.td,
                      ...donationHistoryStyles.statusBase,
                      ...(d.status === "Accepted"
                        ? donationHistoryStyles.statusAccepted
                        : d.status === "Rejected"
                        ? donationHistoryStyles.statusRejected
                        : donationHistoryStyles.statusPending),
                    }}
                  >
                    {d.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {donations.length === 0 && (
            <p style={donationHistoryStyles.emptyText}>
              No donations found yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DonationHistory;
