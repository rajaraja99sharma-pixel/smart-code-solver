import React, { useEffect, useState } from "react";
import axios from "axios";
import"../styles/home.css";
import { useNavigate } from "react-router-dom";
function Home({}) {
  const [problems, setProblems] = useState([]);
   const[filter,setFilter]=useState("All");
   const[solved,setSolved]=useState([]);
   const navigate=useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/api/problems")
      .then(res =>setProblems(res.data))
    .catch(err => console.log(err));
  }, []);
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return;

  axios.get(`http://localhost:5000/api/solved/${user._id}`)
    .then(res => setSolved(res.data))
    .catch(err => console.log(err));

}, []);
  const filtered =
  filter==="All"
  ? problems
  :problems.filter(p=>p.difficulty.toLowerCase()===filter.toLowerCase());
  return (
<div className="container">
  {/* TOP BAR */}

      {/* LEFT SIDE */}
      <div className="sidebar">
        <div className="title">🚀 Smart Code Solver</div>

        {/* FILTER */}
        <div className="filters">
          {["All", "Easy", "Medium", "Hard"].map(f => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* LIST */}
        {filtered.map((p,index) => (
          <div
            key={p._id}
            className="problem"
            onClick={() => navigate(`/problem/${p._id}`)}
          >
               <h3>
              <span style={{ color: "gray", marginRight: "8px" }}>
               {index + 1}.
                  </span>
                   {/* ✅ SOLVED TICK */}
  {solved.includes(p._id) && (
    <span style={{ color: "limegreen", marginRight: "6px" }}>
      ✔️
    </span>
  )}
              {p.title}
              </h3>
            <p className={p.difficulty.toLowerCase()}>
              {p.difficulty}
            </p>
          </div>
        ))}
      </div>
            
      {/* RIGHT EMPTY (initial) */}
      <div className="main">
        <h2>Select a Problem 👈</h2>
      </div>
      <button onClick={()=>navigate("/")}>
  --Back
</button>

    </div>
  );
}

export default Home;