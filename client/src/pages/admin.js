
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function Admin() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [problems, setProblems] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [problemCount, setProblemCount] = useState(0);

  const [editProblem, setEditProblem] = useState(null);
  // ✅ ADD STATE (NEW)
  const [newProblem, setNewProblem] = useState({
    title: "",
    description: "",
    input: "",
    output: "",
    difficulty: "",
    explaination: ""
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // 🔐 Protect Admin
  useEffect(() => {
    if (!token || !user || user.role !== "admin") {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [navigate]);

  // 📊 Fetch Data
  const fetchData = async () => {
    const u = await axios.get("http://localhost:5000/api/users");
    setUsers(u.data);

    const p = await axios.get("http://localhost:5000/api/problems");
    setProblems(p.data);

    setUserCount(u.data.length);
    setProblemCount(p.data.length);
  };

  // ❌ Delete User
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchData();
  };

  // ❌ Delete Problem
  const deleteProblem = async (id) => {
    await axios.delete(`http://localhost:5000/api/problems/${id}`);
    fetchData();
  };

  // ✅ ADD PROBLEM
  const addProblem = async () => {
    try {
      await axios.post("http://localhost:5000/api/problems", newProblem);

      alert("Problem Added ✅");

      setNewProblem({
        title: "",
        description: "",
        input: "",
        output: "",
        difficulty: "",
        explaination: ""
      });

      fetchData();
    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  // ✏️ Update Problem
  const updateProblem = async () => {
    try{
    await axios.put(
      `http://localhost:5000/api/problems/${editProblem._id}`,
      editProblem
    );
    alert("Updated");
    setEditProblem(null);
    fetchData();
  } catch(err){
    console.log(err);
    alert("updated failed");
  }
};

  return (
    <div className="admin-container">

      <h1>⚡ Admin Dashboard</h1>

      {/* STATS */}
      <div className="cards">
        <div className="card">Users: {userCount}</div>
        <div className="card">Problems: {problemCount}</div>
      </div>

      {/* USERS TABLE */}
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => deleteUser(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* 🔥 ADD PROBLEM */}
      <h2>Add Problem</h2>

      <div className="add-form">
        <input placeholder="Title"
          value={newProblem.title}
          onChange={(e)=>setNewProblem({...newProblem,title:e.target.value})}
        />

        <input placeholder="Description"
          value={newProblem.description}
          onChange={(e)=>setNewProblem({...newProblem,description:e.target.value})}
        />

        <input placeholder="Input"
          value={newProblem.input}
          onChange={(e)=>setNewProblem({...newProblem,input:e.target.value})}
        />

        <input placeholder="Output"
          value={newProblem.output}
          onChange={(e)=>setNewProblem({...newProblem,output:e.target.value})}
        />

        <select
          value={newProblem.difficulty}
          onChange={(e)=>setNewProblem({...newProblem,difficulty:e.target.value})}
        >
          <option value="">Select Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input placeholder="Explanation"
          value={newProblem.explaination}
          onChange={(e)=>setNewProblem({...newProblem,explaination:e.target.value})}
        />

        <button onClick={addProblem}>Add Problem</button>
      </div>

      {/* PROBLEMS TABLE */}
      <h2>Problems</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {problems.map(p => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>{p.difficulty}</td>
              <td>
                <button onClick={() => setEditProblem(p)}>Edit</button>
                <button onClick={() => deleteProblem(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editProblem && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Problem</h3>

            <input placeholder="title" value={editProblem.title}
              onChange={e => setEditProblem({...editProblem, title: e.target.value})}
            />

            <input placeholder="description" value={editProblem.description}
              onChange={e => setEditProblem({...editProblem, description: e.target.value})}
            />
            <input placeholder="input" value={editProblem.input}
              onChange={e => setEditProblem({...editProblem, input: e.target.value})}
            />

            <input placeholder="output" value={editProblem.output}
              onChange={e => setEditProblem({...editProblem, output: e.target.value})}
            />

            <select value={editProblem.difficulty}
              onChange={e => setEditProblem({...editProblem, difficulty: e.target.value})}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <input placeholder="explaination" value={editProblem.explaination}
              onChange={e => setEditProblem({...editProblem, explaination: e.target.value})}
            />


            <button onClick={updateProblem}>Update</button>
            <button onClick={() => setEditProblem(null)}>Cancel</button>
          </div>
        </div>
      )}

      <button className="logout" onClick={()=>{
        localStorage.clear();
        navigate("/");
      }}>
        Logout
      </button>
      <p className="back" onClick={() => navigate("/")}>
          ← Back
        </p>

    </div>
  );
}

export default Admin;