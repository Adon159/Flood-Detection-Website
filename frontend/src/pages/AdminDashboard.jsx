import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import styles from "../styles/adminDashboardStyles";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function AdminReliefRequests() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [hoverManage, setHoverManage] = useState(false);
  const [hoverDonation, setHoverDonation] = useState(false);
  const [hoverMap, setHoverMap] = useState(false);
  const [hoverAnalytics, setHoverAnalytics] = useState(false);
  const [hoverChat, setHoverChat] = useState(false);
  const [hoverRelief, setHoverRelief] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);

  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  const initialLetter =
    (user?.name || user?.email || "A").charAt(0).toUpperCase();

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

  return (
    <div style={styles.container}>
      {/* ✅ Same Sidebar Design */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.avatar}>{initialLetter}</div>
          <div>
            <div style={styles.brand}>Flood Relief</div>
            <div style={styles.roleTag}>Admin Portal</div>
          </div>
        </div>

        <div style={styles.sidebarUserBlock}>
          <div style={styles.sidebarUserName}>{user?.name || "Admin User"}</div>
          <div style={styles.sidebarUserEmail}>{user?.email}</div>
        </div>

        <div style={styles.sidebarSectionLabel}>Navigation</div>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverManage ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => setHoverManage(true)}
          onMouseLeave={() => setHoverManage(false)}
          onClick={() => navigate("/admin/manage-users")}
        >
          Manage Users
        </button>

        <button
          type="button"
          style={styles.navItem}
          onClick={() => navigate("/admin/resources")}
        >
          Relief Resources
        </button>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverRelief ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => setHoverRelief(true)}
          onMouseLeave={() => setHoverRelief(false)}
          onClick={() => navigate("/admin/relief-requests")}
        >
          Relief Requests (Email)
        </button>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverDonation ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => setHoverDonation(true)}
          onMouseLeave={() => setHoverDonation(false)}
          onClick={() => navigate("/admin/donations")}
        >
          Donation Management
        </button>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverAnalytics ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => setHoverAnalytics(true)}
          onMouseLeave={() => setHoverAnalytics(false)}
          onClick={() => navigate("/admin/analytics")}
        >
          Analytics
        </button>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverChat ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => setHoverChat(true)}
          onMouseLeave={() => setHoverChat(false)}
          onClick={() => navigate("/admin/chat")}
        >
          Report Chats
        </button>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverMap ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => setHoverMap(true)}
          onMouseLeave={() => setHoverMap(false)}
          onClick={() => window.open("http://localhost:3000", "_blank")}
        >
          Flood Risk Map 🌊
        </button>

        <div style={styles.sidebarSpacer} />

        <button
          type="button"
          style={{
            ...styles.logoutButton,
            ...(hoverLogout ? styles.logoutHover : {}),
          }}
          onMouseEnter={() => setHoverLogout(true)}
          onMouseLeave={() => setHoverLogout(false)}
          onClick={logout}
        >
          Logout
        </button>
      </aside>

      {/* ✅ Main Area */}
      <main style={styles.main}>
        <h1 style={styles.mainTitle}>Admin Request Management ✅</h1>
        <p style={styles.mainSubtitle}>
          View, verify proof, approve/reject, mark delivered — emails are sent automatically.
        </p>

        <div style={{ overflowX: "auto", marginTop: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "Victim",
                  "District",
                  "Help Type",
                  "Status",
                  "Verify",
                  "Assign Volunteer",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.12)",
                      padding: 10,
                      textAlign: "left",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {requests.map((r) => (
                <tr key={r._id}>
                  <td style={{ padding: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    {r.userId?.name} <br />
                    <small>{r.userId?.email}</small>
                  </td>

                  <td style={{ padding: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    {r.district}
                  </td>

                  <td style={{ padding: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    {r.helpType}
                  </td>

                  <td style={{ padding: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <b>{r.status}</b>
                  </td>

                  <td style={{ padding: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <button onClick={() => openProof(r.proofFile)}>View Proof</button>
                  </td>

                  <td style={{ padding: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <select
                      defaultValue={r.assignedVolunteer?._id || ""}
                      onChange={(e) => assignVolunteer(r._id, e.target.value)}
                    >
                      <option value="">-- Select volunteer --</option>
                      {volunteers.map((v) => (
                        <option key={v._id} value={v._id}>
                          {v.name} ({v.email})
                        </option>
                      ))}
                    </select>

                    {r.assignedVolunteer?.name && (
                      <div style={{ marginTop: 6 }}>
                        <small>
                          Assigned: <b>{r.assignedVolunteer.name}</b>
                        </small>
                      </div>
                    )}
                  </td>

                  <td style={{ padding: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <button onClick={() => updateStatus(r._id, "approved")}>
                      Approve
                    </button>{" "}
                    <button onClick={() => updateStatus(r._id, "delivered")}>
                      Delivered
                    </button>{" "}
                    <button onClick={() => updateStatus(r._id, "rejected")}>
                      Reject
                    </button>{" "}
                    <button onClick={() => updateStatus(r._id, "pending")}>
                      Pending
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {requests.length === 0 && <p style={{ marginTop: 16 }}>No requests found.</p>}
        </div>
      </main>
    </div>
  );
}
