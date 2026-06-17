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
  const[error,setErrors]=useState("");

  const navigate = useNavigate();
   
  const validate=()=>{
    let newErrors={};
    if(form.name.length<3){
      newErrors.name= "Username must be at least 3 characters";
    }
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!form.email){
      newErrors.email="Email is required";
    }
     else if (!emailRegex.test(form.email)) {
      newErrors.email= "Enter valid email address";
    }
    if(!form.password){
      newErrors.password="Password is required";
    }
    else if (form.password.length < 8 || form.password.length > 16) {
      newErrors.password= "Password must be 8-16 characters";
    }
    if(!form.phone){
      newErrors.phone="phone number is required";
    }
    else if(form.phone.length===9){
      newErrors.phone="phone must only contain 10 digit number";
    }
    setErrors(newErrors);
     return Object.keys(newErrors).length===0;
  };


  const handleSignup = async () => {
     if(!validate()) return;
    
    
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Account Created ✅");
      navigate("/login");
    } catch (err) {
       const msg=err.response?.data?.msg;
      //alert(err.response?.data?.message || "Signup Failed ❌");
      if (msg?.includes("Email")) {
        setErrors(prev => ({ ...prev, email: msg }));
      } else if (msg?.includes("Username")) {
        setErrors(prev => ({ ...prev, name: msg }));
      } else if(msg?.includes("phone")){
        setErrors(prev=>({...prev,phone:msg}));
      } 
      else {
        alert("please correct your name or choice other name this is already saved");
      }
    }
  };

  return (
    <div className="auth-container">
    <div className="auth-card">
      <h2>Create Account</h2>

      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {error.name && <p className="error">{error.name}</p>}

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      {error.email && <p className="error">{error.email}</p>}

      <input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      {error.phone && <p className="error">{error.phone}</p>}

      <div style={{ position: "relative" }}>
        <div className="password-box">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    onChange={(e) => setForm({...form,password:e.target.value})}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
  >
   <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
  </span>
</div>
{error.password && <p className="error">{error.password}</p>}
      <button onClick={handleSignup}>Signup</button>

      <button onClick={() => navigate("/")}>
        ⬅ Back 
      </button>
      <p className="switch-text">
        Already have an account ?
        <span onClick={()=>navigate("/login")}>Login</span>
      </p>
    </div>
    </div>
    </div>
  );
}

export default Signup;