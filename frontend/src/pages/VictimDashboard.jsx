import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/victimDashboardStyles";

const VictimDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [hoverProfile, setHoverProfile] = useState(false);
  const [hoverMap, setHoverMap] = useState(false);
  const [hoverRelief, setHoverRelief] = useState(false);
  const [hoverChat, setHoverChat] = useState(false); 
  const [hoverLogout, setHoverLogout] = useState(false);

  const initialLetter =
    (user?.name || user?.email || "V").charAt(0).toUpperCase();

  return (
    <div style={styles.container}>

      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.avatar}>{initialLetter}</div>
          <div>
            <div style={styles.brand}>Flood Relief</div>
            <div style={styles.roleTag}>Victim Portal</div>
          </div>
        </div>

        <div style={styles.sidebarUserBlock}>
          <div style={styles.sidebarUserName}>
            {user?.name || "Victim User"}
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
            ...(hoverMap ? styles.navItemHover : {}),
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
            ...(hoverRelief ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => setHoverRelief(true)}
          onMouseLeave={() => setHoverRelief(false)}
          onClick={() => navigate("/relief-request")}
        >
          Relief Request 🆘
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
          Report / Chat with Admin
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
          Hi, {user?.name || "there"} 👋
        </h1>
        <p style={styles.mainSubtitle}>
          This is your Flood Relief victim dashboard. From here you can keep your
          information updated and track support related to your situation.
        </p>

        <div style={styles.infoGrid}>
          <div style={styles.infoCardPrimary}>
            <h2 style={styles.infoTitle}>Need Help?</h2>
            <p style={styles.infoText}>
              Make sure your contact details and address are correct so
              volunteers and donors can reach you quickly during emergencies.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VictimDashboard;
