import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/volunteerDashboardStyles";

const VolunteerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [hoverProfile, setHoverProfile] = useState(false);
  const [hoverMap, setHoverMap] = useState(false);
  const [hoverChat, setHoverChat] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const initialLetter =
    (user?.name || user?.email || "V").charAt(0).toUpperCase();

  // Fetch assigned relief requests
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/volunteer/assignments",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setAssignments(res.data);
      } catch (err) {
        setError("Failed to load assigned requests");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // General update: mark delivery / accept / reject
  const updateAssignmentStatus = async (requestId, status) => {
    // Prevent volunteers from changing status once the assignment is final (approved or rejected)
    const current = assignments.find((a) => a._id === requestId);
    if (current && (current.status === "approved" || current.status === "rejected")) {
      alert("This assignment is final and cannot be changed.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:5000/api/volunteer/delivery/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Use updated request from server to keep client in sync
      setAssignments((prev) =>
        prev.map((req) => (req._id === requestId ? data.request : req))
      );
    } catch (err) {
      alert("Failed to update request status");
    }
  };

  // Convenience wrappers
  const markAsDelivered = (requestId) => updateAssignmentStatus(requestId, "delivered");
  const acceptRequest = (requestId) => updateAssignmentStatus(requestId, "approved");
  const rejectRequest = (requestId) => updateAssignmentStatus(requestId, "rejected");

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.avatar}>{initialLetter}</div>
          <div>
            <div style={styles.brand}>Flood Relief</div>
            <div style={styles.roleTag}>Volunteer Portal</div>
          </div>
        </div>

        <div style={styles.sidebarUserBlock}>
          <div style={styles.sidebarUserName}>
            {user?.name || "Volunteer User"}
          </div>
          <div style={styles.sidebarUserEmail}>{user?.email}</div>
        </div>

        <div style={styles.sidebarSectionLabel}>Navigation</div>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverProfile ? styles.navItemHover : {})
          }}
          onMouseEnter={() => setHoverProfile(true)}
          onMouseLeave={() => setHoverProfile(false)}
          onClick={() => navigate("/profile")}
        >
          View Profile
        </button>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverMap ? styles.navItemHover : {})
          }}
          onMouseEnter={() => setHoverMap(true)}
          onMouseLeave={() => setHoverMap(false)}
          onClick={() => window.open("http://localhost:3000", "_blank")}
        >
          Flood Risk Map 🌊
        </button>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverChat ? styles.navItemHover : {})
          }}
          onMouseEnter={() => setHoverChat(true)}
          onMouseLeave={() => setHoverChat(false)}
          onClick={() => navigate("/report-chat")}
        >
          Report / Chat
        </button>

        <div style={styles.sidebarSpacer} />

        <button
          type="button"
          style={{
            ...styles.logoutButton,
            ...(hoverLogout ? styles.logoutHover : {})
          }}
          onMouseEnter={() => setHoverLogout(true)}
          onMouseLeave={() => setHoverLogout(false)}
          onClick={logout}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <h1 style={styles.mainTitle}>
          Hey, {user?.name || "Volunteer"} 🙌
        </h1>

        <p style={styles.mainSubtitle}>
          Below are the relief requests assigned to you. Please coordinate and
          mark deliveries once aid has been provided.
        </p>

        <h2 style={styles.sectionTitle}>Assigned Relief Requests</h2>

        {loading && <p>Loading assignments...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && assignments.length === 0 && (
          <p>No relief requests assigned yet.</p>
        )}

        <div style={styles.cardGrid}>
          {assignments.map((req) => (
            <div key={req._id} style={styles.requestCard}>
              <h3 style={styles.cardTitle}>{req.helpType}</h3>

              <p><strong>District:</strong> {req.district}</p>
              <p><strong>Contact:</strong> {req.contactNumber}</p>
              <p><strong>Description:</strong> {req.description || "N/A"}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color: req.status === "delivered" ? "green" : "orange"
                  }}
                >
                  {req.status}
                </span>
              </p>

              <div style={{ marginTop: 12 }}>
                {(() => {
                  const isFinal = req.status === "approved" || req.status === "rejected";

                  return (
                    <>
                      {/* Approve / Approved */}
                      <button
                        style={{
                          ...styles.actionBtn,
                          ...styles.approveBtn,
                          ...(isFinal ? styles.disabledBtn : {}),
                        }}
                        disabled={isFinal}
                        onClick={() => acceptRequest(req._id)}
                      >
                        {req.status === "approved" ? "Approved" : "Accept"}
                      </button>

                      {/* Reject / Rejected */}
                      <button
                        style={{
                          ...styles.actionBtn,
                          ...styles.rejectBtn,
                          ...(isFinal ? styles.disabledBtn : {}),
                        }}
                        disabled={isFinal}
                        onClick={() => rejectRequest(req._id)}
                      >
                        {req.status === "rejected" ? "Rejected" : "Reject"}
                      </button>

                      {/* Deliver / Delivered */}
                      <button
                        style={{
                          ...styles.actionBtn,
                          ...styles.deliverBtn,
                          ...(isFinal || req.status === "delivered" ? styles.disabledBtn : {}),
                        }}
                        disabled={isFinal || req.status === "delivered"}
                        onClick={() => markAsDelivered(req._id)}
                      >
                        {req.status === "delivered" ? "Delivered" : "Mark as Delivered"}
                      </button>
                    </>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VolunteerDashboard;