import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import styles from "../styles/registerStyles";

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

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    password: "",
    role: "Victim",
    gender: "",
    age: "",
  });

  const [error, setError] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [loginHover, setLoginHover] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", {
        ...form,
        age: Number(form.age),
      });
      navigate("/login?registered=1");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create an Account</h2>

        {error && <p style={styles.errorText}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            required
            style={styles.select}
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
            required
            style={styles.select}
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
            required
            min={1}
            max={120}
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Victim">Victim</option>
            <option value="Donor">Donor</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(btnHover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            Sign up
          </button>
        </form>

        <div style={styles.loginWrapper}>
          <span style={{ fontSize: "14px", color: "#555" }}>
            Already registered?{" "}
          </span>
          <Link
            to="/login"
            style={{
              ...styles.loginLink,
              ...(loginHover ? styles.loginLinkHover : {}),
            }}
            onMouseEnter={() => setLoginHover(true)}
            onMouseLeave={() => setLoginHover(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
