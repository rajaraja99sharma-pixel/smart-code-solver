import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Home({}) {
  const [problems, setProblems] = useState([]);
   const[filter,setFilter]=useState("All");
   const navigate=useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/api/problems")
      .then(res =>setProblems(res.data))
    .catch(err => console.log(err));
  }, []);
  //const filtered=problems.filter(p=> filter=="All"||p.difficulty===filter);
  const filtered =
  filter==="All"
  ? problems
  :problems.filter(p=>p.difficulty.toLowerCase()===filter.toLowerCase());
  //<button onClick={()=> navigate("/login")}>
   // login
  //</button>
  //navigate("/admin");
  return (
    //<div style={{ padding: "20px" }}>
      //<h1>Smart Code Solver 🚀</h1>

      //{/* FILTER */}
      //<div style={{ marginBottom: "15px", cursor:"pointer"}}>
        //{["All", "Easy", "Medium", "Hard"].map(f => (
         // <button
           // key={f}
           // onClick={() => setFilter(f)}
           // style={{
             // marginRight: "10px",
             // padding: "5px 10px",
             // background: filter === f ? "black" : "gray",
             // color: "white",
             // border: "none",
             // cursor:"pointer"
            //}}
         // >
          //  {f}
          //</button>
        //))}
      //</div>

      //{/* PROBLEM LIST */}
      //{filtered.map(p => (
        //<div
         // key={p._id}
          //onClick={() => setSelectedId(p._id)}
          //style={{
            //padding: "10px",
            //borderBottom: "1px solid #ccc",
            //cursor: "pointer"
          //}}
       // >
         // <h3>{p.title}</h3>
          //<span>{p.difficulty}</span>
        //</div>
      //))}
    //</div>
  //);
//}
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