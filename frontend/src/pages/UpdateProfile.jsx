import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import styles from "../styles/updateProfileStyles";

const districts = [
  "Bagerhat","Bandarban","Barguna","Barishal","Bhola","Bogura",
  "Brahmanbaria","Chandpur","Chattogram","Chuadanga","Cox's Bazar",
  "Cumilla","Dhaka","Dinajpur","Faridpur","Feni","Gaibandha",
  "Gazipur","Gopalganj","Habiganj","Jamalpur","Jashore","Jhalokathi",
  "Jhenaidah","Joypurhat","Khagrachhari","Khulna","Kishoreganj",
  "Kurigram","Kushtia","Lakshmipur","Lalmonirhat","Madaripur",
  "Magura","Manikganj","Meherpur","Moulvibazar","Munshiganj",
  "Mymensingh","Naogaon","Narail","Narayanganj","Narsingdi",
  "Natore","Netrokona","Nilphamari","Noakhali","Pabna",
  "Panchagarh","Patuakhali","Pirojpur","Rajbari","Rajshahi",
  "Rangamati","Rangpur","Satkhira","Shariatpur","Sherpur",
  "Sirajganj","Sunamganj","Sylhet","Tangail","Thakurgaon"
];

const UpdateProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    gender: "",
    age: ""
  });

  const [btnHover, setBtnHover] = useState(false);
  const [backHover, setBackHover] = useState(false);

  useEffect(() => {
    api
      .get(`/profile/${userId}`)
      .then((res) => {
        const { name, phone, address, district, gender, age } = res.data;

        setForm({
          name,
          phone,
          address,
          district: district || "",
          gender,
          age
        });
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .put(`/profile/${userId}`, form)
      .then(() => {
        alert("Profile Updated Successfully!");
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Update Profile</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* ✅ DISTRICT SELECT */}
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* BUTTON ROW */}
          <div style={styles.buttonRow}>
            <button
              type="button"
              style={{
                ...styles.backButton,
                ...(backHover ? styles.backHover : {}),
              }}
              onMouseEnter={() => setBackHover(true)}
              onMouseLeave={() => setBackHover(false)}
              onClick={() => navigate("/profile")}
            >
              ← Back to Profile
            </button>

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(btnHover ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
