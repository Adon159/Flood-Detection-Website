import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import styles from "../styles/donorDashboardStyles";

const DonorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [totalDonated, setTotalDonated] = useState(0);

  const [hoverProfile, setHoverProfile] = useState(false);
  const [hoverMap, setHoverMap] = useState(false);
  const [hoverDonate, setHoverDonate] = useState(false);
  const [hoverHistory, setHoverHistory] = useState(false);
  const [hoverChat, setHoverChat] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);

  useEffect(() => {
    api
      .get("/donations/total")
      .then((res) => setTotalDonated(res.data.total))
      .catch((err) => console.log(err));
  }, []);

  const initialLetter =
    (user?.name || user?.email || "D").charAt(0).toUpperCase();

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.avatar}>{initialLetter}</div>
          <div>
            <div style={styles.brand}>Flood Relief</div>
            <div style={styles.roleTag}>Donor Portal</div>
          </div>
        </div>

        <div style={styles.sidebarUserBlock}>
          <div style={styles.sidebarUserName}>
            {user?.name || "Donor User"}
          </div>
          <div style={styles.sidebarUserEmail}>{user?.email}</div>
        </div>

        <div style={styles.sidebarSectionLabel}>Navigation</div>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverProfile ? styles.navItemHover : {}),
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
            ...(hoverDonate ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => setHoverDonate(true)}
          onMouseLeave={() => setHoverDonate(false)}
          onClick={() => navigate("/make-donation")}
        >
          Make Donation
        </button>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverHistory ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => setHoverHistory(true)}
          onMouseLeave={() => setHoverHistory(false)}
          onClick={() => navigate("/donation-history")}
        >
          Donation History
        </button>

        <button
          type="button"
          style={{
            ...styles.navItem,
            ...(hoverChat ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => setHoverChat(true)}
          onMouseLeave={() => setHoverChat(false)}
          onClick={() => navigate("/report-chat")}
        >
          Contact Admin
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

      <main style={styles.main}>
        <h1 style={styles.mainTitle}>
          Welcome, {user?.name || "Donor"} 💙
        </h1>

        <p style={styles.mainSubtitle}>
          Thank you for supporting flood-affected families. Your contributions
          make a real difference.
        </p>

        <div style={styles.infoGrid}>
          <div style={styles.infoCardPrimary}>
            <h2 style={styles.infoTitle}>Total Donated (Accepted)</h2>
            <p style={{ fontSize: "28px", fontWeight: "bold", color: "#0a7cff" }}>
              ৳ {totalDonated}
            </p>
            <p style={styles.infoText}>
              This amount includes only donations that have been verified and
              accepted by the administration.
            </p>
          </div>

          <div style={styles.infoCardPrimary}>
            <h2 style={styles.infoTitle}>Your Support Matters</h2>
            <p style={styles.infoText}>
              Donations are used to provide food, clean water, medicine, and
              emergency shelter. Accurate information helps us maintain
              transparency and reach you when needed.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonorDashboard;
