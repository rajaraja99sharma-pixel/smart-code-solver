import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      <h1>🚀 Smart Code Solver</h1>
      <p>Practice Coding Like a Pro 💻</p>

      <div className="buttons">
        <button onClick={()=> navigate("/signup")}>
          Create Account
        </button>
        <button onClick={() => navigate("/login")}>
          👤 Login
        </button>

        <button onClick={() => navigate("/admin")}>
          🔑 Admin
        </button>
      </div>

    </div>
  );
}

export default Landing;