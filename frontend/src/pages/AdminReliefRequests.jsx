import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import styles from "../styles/adminReliefStyles";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function AdminReliefRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  const loadData = async () => {
    const [reqRes, userRes] = await Promise.all([
      api.get("/relief/admin"),
      api.get("/admin/users"),
    ]);
    setRequests(reqRes.data);
    setUsers(userRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const volunteers = users.filter((u) => u.role === "Volunteer");

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/relief/admin/${id}/status`, { status });
      alert(res.data.message);
      loadData();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed");
    }
  };

  const assignVolunteer = async (id, volunteerId) => {
    if (!volunteerId) return;
    try {
      const res = await api.put(`/relief/admin/${id}/assign`, { volunteerId });
      alert(res.data.message);
      loadData();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed");
    }
  };

  const openProof = (fileName) => {
    if (!fileName) return alert("No proof file uploaded.");
    window.open(`${API_BASE_URL}/uploads/${fileName}`, "_blank");
  };

  const statusStyle = (status) => {
    if (status === "approved") return { ...styles.status, ...styles.statusApproved };
    if (status === "delivered") return { ...styles.status, ...styles.statusDelivered };
    if (status === "rejected") return { ...styles.status, ...styles.statusRejected };
    return { ...styles.status, ...styles.statusPending };
  };

  // ✅ Button behavior (UI shows correct status)
  // - If approved: show "Approved" (disabled), Deliver enabled
  // - If delivered: show "Delivered" (disabled), others disabled
  // - If rejected: show "Rejected" (disabled), others disabled
  // - If pending: Approve enabled, Deliver disabled (recommended), Reject enabled
  const renderActions = (r) => {
    const isPending = r.status === "pending";
    const isApproved = r.status === "approved";
    const isDelivered = r.status === "delivered";
    const isRejected = r.status === "rejected";

    return (
      <div style={styles.actionsWrap}>
        {/* Approve */}
        <button
          style={{
            ...styles.actionBtn,
            ...styles.approveBtn,
            ...(isApproved || isDelivered || isRejected ? styles.disabledBtn : {}),
          }}
          disabled={isApproved || isDelivered || isRejected}
          onClick={() => updateStatus(r._id, "approved")}
        >
          {isApproved ? "Approved" : "Approve"}
        </button>

        {/* Deliver */}
        <button
          style={{
            ...styles.actionBtn,
            ...styles.deliverBtn,
            // deliver only after approved (recommended)
            ...((!isApproved || isDelivered || isRejected) ? styles.disabledBtn : {}),
          }}
          disabled={!isApproved || isDelivered || isRejected}
          onClick={() => updateStatus(r._id, "delivered")}
        >
          {isDelivered ? "Delivered" : "Deliver"}
        </button>

        {/* Reject */}
        <button
          style={{
            ...styles.actionBtn,
            ...styles.rejectBtn,
            ...(isRejected || isDelivered ? styles.disabledBtn : {}),
          }}
          disabled={isRejected || isDelivered}
          onClick={() => updateStatus(r._id, "rejected")}
        >
          {isRejected ? "Rejected" : "Reject"}
        </button>
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Relief Request Control Panel</h1>
        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ← Return to Dashboard
        </button>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Victim</th>
                <th style={styles.th}>District</th>
                <th style={styles.th}>Help Type</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Verify</th>
                <th style={styles.th}>Assign Volunteer</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((r) => (
                <tr key={r._id}>
                  <td style={styles.td}>
                    <div style={styles.victimName}>{r.userId?.name}</div>
                    <div style={styles.victimEmail}>{r.userId?.email}</div>
                  </td>

                  <td style={styles.td}>{r.district}</td>
                  <td style={styles.td}>{r.helpType}</td>

                  <td style={styles.td}>
                    <span style={statusStyle(r.status)}>
                      {r.status?.charAt(0).toUpperCase() + r.status?.slice(1)}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <button style={styles.proofBtn} onClick={() => openProof(r.proofFile)}>
                      View Proof
                    </button>
                  </td>

                  <td style={styles.td}>
                    <select
                      style={styles.select}
                      value={r.assignedVolunteer?._id || ""}
                      onChange={(e) => assignVolunteer(r._id, e.target.value)}
                    >
                      <option value="">-- Select volunteer --</option>
                      {volunteers.map((v) => (
                        <option key={v._id} value={v._id}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td style={styles.td}>{renderActions(r)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {requests.length === 0 && (
            <div style={{ padding: 16, color: "#64748b" }}>
              No requests found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
