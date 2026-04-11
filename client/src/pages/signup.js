import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";
function Signup() {
    const[showPassword,setShowPassword]=useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Account Created ✅");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed ❌");
    }
  };

  return (
    <div className="signup-container">
    <div className="card">
      <h2>Create Account</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <div style={{ position: "relative" }}>
        <div className="password-box">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    onChange={(e) => setForm({...form,password:e.target.value})}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
   // style={{
     // position: "absolute",
     // right: "10px",
     // top: "8px",
     // cursor: "pointer"
    //}}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>

      <button onClick={handleSignup}>Signup</button>

      <button onClick={() => navigate("/login")}>
        ⬅ Back to Login
      </button>
    </div>
    </div>
    </div>
  );
}

export default Signup;