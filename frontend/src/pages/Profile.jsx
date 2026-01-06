import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import styles from "../styles/profileStyles";

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const [backHover, setBackHover] = useState(false);

  useEffect(() => {
    if (!userId) return;

    api
      .get(`/profile/${userId}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  if (!profile) return <p style={{ padding: 20 }}>Loading...</p>;

  const initialLetter =
    (profile.name || profile.email || "U").charAt(0).toUpperCase();

  const dashboardRoute =
    profile.role === "Admin"
      ? "/admin"
      : profile.role === "Donor"
      ? "/donor"
      : profile.role === "Volunteer"
      ? "/volunteer"
      : "/victim";

  const isActive = profile.status === "Active";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.headerRow}>
          <div style={styles.avatar}>{initialLetter}</div>

          <div>
            <div style={styles.name}>{profile.name}</div>

            <div style={styles.chipRow}>
              <span style={styles.roleChip}>{profile.role}</span>
              <span
                style={{
                  ...styles.statusChipBase,
                  ...(isActive ? styles.statusActive : styles.statusDeactive),
                }}
              >
                {profile.status}
              </span>
            </div>

            <div style={styles.email}>{profile.email}</div>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Info Grid */}
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Phone</div>
            <div style={styles.infoValue}>{profile.phone}</div>
          </div>

          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Address</div>
            <div style={styles.infoValue}>{profile.address}</div>
          </div>

          {/* ✅ DISTRICT ADDED */}
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>District</div>
            <div style={styles.infoValue}>
              {profile.district || "Not set"}
            </div>
          </div>

          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Gender</div>
            <div style={styles.infoValue}>{profile.gender}</div>
          </div>

          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Age</div>
            <div style={styles.infoValue}>{profile.age}</div>
          </div>
        </div>

        {/* Buttons Row */}
        <div style={styles.buttonRow}>
          <button
            style={{
              ...styles.backButton,
              ...(backHover ? styles.backHover : {}),
            }}
            onMouseEnter={() => setBackHover(true)}
            onMouseLeave={() => setBackHover(false)}
            onClick={() => navigate(dashboardRoute)}
          >
            ← Back to Dashboard
          </button>

          <button
            style={{
              ...styles.button,
              ...(btnHover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            onClick={() => navigate("/update-profile")}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
