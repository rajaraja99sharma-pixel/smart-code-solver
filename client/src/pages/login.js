import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword,setShowPassword]=useState(false);
  const navigate = useNavigate();
 

  const handleLogin = async () => {
   // const res = await axios.post("http://localhost:5000/api/auth/login", form);
   try{
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    localStorage.setItem("user", JSON.stringify(res.data));

    if (res.data.role === "admin") {
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
    <div className="center">
      <div className="card">
      <h2>Login</h2>

 <button onClick={()=>navigate("/")}>
    Back
  </button>

       <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      /> 
      <div style={{ position: "relative" }}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    onChange={(e) => setForm({...form,password:e.target.value})}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "10px",
      top: "8px",
      cursor: "pointer"
    }}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>

      <button onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
}

export default Login;