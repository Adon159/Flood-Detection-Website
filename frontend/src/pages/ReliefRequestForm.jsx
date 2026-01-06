import React, { useState, useEffect } from "react";
import axios from "axios";
import reliefRequestStyles from "../styles/reliefRequestStyles";
import { useAuth } from "../context/AuthContext";

const ReliefRequestForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    contactNumber: "",
    helpType: "",
    description: "",
    district: "",
  });

  const [proofFile, setProofFile] = useState(null);

  useEffect(() => {
    const district = user?.district;
    if (!district) return;

    setFormData((prev) => {
      
      if (prev.district === district) return prev;
      return { ...prev, district };
    });
  }, [user?.district]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProofFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const userId = user?.id || localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in before submitting a relief request.");
      return;
    }

    if (!formData.contactNumber || !formData.helpType || !formData.district) {
      alert("Please fill in Contact Number, Help Type and ensure your district is set.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (proofFile) {
      data.append("proofFile", proofFile);
    }

    
    data.append("userId", userId);

    try {
      
      const res = await axios.post("/api/relief/submit", data);
      alert(res.data?.message || "Relief request submitted successfully");
    } catch (error) {
      console.error("Relief submit error:", error.response || error.message || error);
      const serverMsg = error.response?.data?.message;
      const details = error.response?.data?.errors || error.response?.data?.error;
      alert(
        "Submission failed: " + (serverMsg || details || error.message || "Unknown error")
      );
    }
  };

  return (
    <div style={reliefRequestStyles.page}>
      <div style={reliefRequestStyles.card}>
        <h2 style={reliefRequestStyles.title}>
          Relief Request Submission
        </h2>

        <p style={reliefRequestStyles.subtitle}>
          District: <strong>{formData.district}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <label style={reliefRequestStyles.label}>
            Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            style={reliefRequestStyles.input}
            required
            onChange={handleChange}
          />

          <label style={reliefRequestStyles.label}>
            Help Type
          </label>
          <select
            name="helpType"
            style={reliefRequestStyles.select}
            required
            onChange={handleChange}
          >
            <option value="">Select Help Type</option>
            <option value="Food">Food</option>
            <option value="Shelter">Shelter</option>
            <option value="Medicine">Medicine</option>
            <option value="Clothing">Clothing</option>
            <option value="Other">Other</option>
          </select>

          <label style={reliefRequestStyles.label}>
            Description
          </label>
          <textarea
            name="description"
            style={reliefRequestStyles.textarea}
            onChange={handleChange}
          />

          <input
            type="file"
            style={reliefRequestStyles.fileInput}
            accept="image/*,.pdf"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            style={reliefRequestStyles.button}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReliefRequestForm;
