import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Admin() {
  const navigate=useNavigate();
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(!user || user.role !=="admin"){
      navigate("/login");
    }
  },[]);
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    input: "",
    output: "",
    difficulty: ""
  });

  const handleAdd = async () => {
    await axios.post("http://localhost:5000/api/problems", problem);
    alert("Problem Added!");
  };

  return (
    <div>
       <button onClick={()=>navigate("/")}>
          Back to home
     </button>
      <h2>Admin Panel</h2>
      

      <input placeholder="Title"
        onChange={e => setProblem({ ...problem, title: e.target.value })}
      />

      <textarea placeholder="Description"
        onChange={e => setProblem({ ...problem, description: e.target.value })}
      />

      <input placeholder="Input"
        onChange={e => setProblem({ ...problem, input: e.target.value })}
      />

      <input placeholder="Output"
        onChange={e => setProblem({ ...problem, output: e.target.value })}
      />

      <input placeholder="Difficulty"
        onChange={e => setProblem({ ...problem, difficulty: e.target.value })}
      />

      <button onClick={handleAdd}>Add Problem</button>
    </div>
  );
}

export default Admin;