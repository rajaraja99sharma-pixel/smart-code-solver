import { useNavigate } from "react-router-dom";
import"../styles/landing.css";
function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
     <div className="landing-box">
      <h1>🚀 Smart Code Solver</h1>
      <p>Practice Coding Like a Pro 💻</p>

      <div className="buttons">
        <button onClick={()=> navigate("/signup")}>
          🔏Create Account
        </button>
        <button onClick={() => navigate("/login")}>
          👤 Login
        </button>

        <button onClick={() => navigate("/admin")}>
          🔑 Admin
        </button>
      </div>
      </div>
    </div>
  );
}

export default Landing;