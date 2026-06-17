import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword,setShowPassword]=useState(false);
  const navigate = useNavigate();
 

  const handleLogin = async () => {
   try{
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token",res.data.token);
    if (res.data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  }
  catch(err){
    alert("login Failed");
  }
  };

  return (
<div className="login-container">

      <div className="login-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <i
            className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        <button onClick={handleLogin}>Login</button>

        <p className="back" onClick={() => navigate("/")}>
          ← Back
        </p>
      </div>

    </div>
  );
}
export default Login;