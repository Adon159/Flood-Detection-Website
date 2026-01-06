import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/manageUsersStyles";
import api from "../api/axios";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const activateUser = async (id) => {
    try {
      await api.patch(`/admin/activate/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error activating user:", err);
    }
  };

  const deactivateUser = async (id) => {
    try {
      await api.patch(`/admin/deactivate/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deactivating user:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/delete/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading) return <p style={styles.loading}>Loading users...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Manage Users</h1>

      {/* ✅ Return to Dashboard */}
      <button
        style={{
          ...styles.backBtn,
          ...(styles.backBtnHover ? styles.backBtnHover : {})
        }}
        onClick={() => navigate("/admin")}
      >
        ← Return to Dashboard
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} style={styles.tr}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.role}</td>
              <td
                style={{
                  ...styles.td,
                  color: user.status === "Active" ? "green" : "red",
                }}
              >
                {user.status}
              </td>
              <td style={styles.actionTd}>
                {user.status === "Active" ? (
                  <button
                    style={styles.deactivateBtn}
                    onClick={() => deactivateUser(user._id)}
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    style={styles.activateBtn}
                    onClick={() => activateUser(user._id)}
                  >
                    Activate
                  </button>
                )}

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
