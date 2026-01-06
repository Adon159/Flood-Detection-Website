import { useEffect, useState } from "react";
import styles from "../styles/adminResourcesStyles";

const AdminResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

const [newResource, setNewResource] = useState({
    itemName: "",
    category: "Food",
    quantity: 0,
    unit: "packs",
    description: "",
});

  const fetchResources = async () => {
    try {
      const res = await fetch("/api/admin/resources");
      const data = await res.json();
      setResources(data);
    } catch (err) {
      console.error("Failed to load resources", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteResource = async (id) => {
    if (!window.confirm("Delete this resource?")) return;

    await fetch(`/api/admin/resources/${id}`, {
      method: "DELETE",
    });

    setResources((prev) => prev.filter((r) => r._id !== id));
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleAddResource = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/resources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newResource),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to add resource");
      }

      const data = await res.json();
      setResources((prev) => [data.data, ...prev]);

      setNewResource({
        itemName: "",
        category: "Food",
        quantity: 0,
        unit: "packs",
        description: "",
      });
    } catch (err) {
      console.error("Failed to add resource", err);
      alert(err.message || "Failed to add resource");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Relief Resource Management</h1>
      <p style={styles.subtitle}>
        Manage available relief supplies and monitor inventory levels.
      </p>

      <form style={styles.form} onSubmit={handleAddResource}>
        <input
          name="itemName"
          value={newResource.itemName}
          onChange={handleChange}
          placeholder="Item name"
          required
          style={styles.input}
        />

        <select
          name="category"
          value={newResource.category}
          onChange={handleChange}
          style={styles.select}
        >
          <option>Food</option>
          <option>Clothing</option>
          <option>Medicine</option>
          <option>Other</option>
        </select>

        <input
          name="quantity"
          type="number"
          min="0"
          value={newResource.quantity}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="unit"
          value={newResource.unit}
          onChange={handleChange}
          style={styles.input}
          placeholder="Unit (packs, kg...)"
        />

        <button type="submit" style={styles.addBtn} disabled={loading}>
          {loading ? "Adding..." : "Add Resource"}
        </button>
      </form>

      {loading ? (
        <p>Loading resources...</p>
      ) : (
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => (
                <tr key={r._id}>
                  <td>{r.itemName}</td>
                  <td>{r.category}</td>
                  <td>{r.quantity}</td>
                  <td>{r.unit}</td>
                  <td>
                    <button style={styles.deleteBtn} onClick={() => deleteResource(r._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {resources.length === 0 && (
                <tr>
                  <td colSpan="5" style={styles.empty}>
                    No resources found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminResources;