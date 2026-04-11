import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

//function ProblemPage({ selectedId }) {
  //const [problem, setProblem] = useState(null);
function Problempage(){
  const{id}=useParams();
  const navigate=useNavigate();
  const[problem,setProblem]=useState(null);
  useEffect(() => {
   // if (!selectedId) return;

    axios.get(`http://localhost:5000/api/problems/${id}`)
      .then(res => setProblem(res.data))
      .catch(err => console.log(err));
  }, [id]);

 // if (!selectedId) return <p>Select a problem</p>;
  if (!problem) return <p>Loading...</p>;

  return (
    
    //<div style={{ padding: "20px" }}>
     //<h3>Description</h3>
//<p>{problem.description || "No description"}</p>

//<h3>Input</h3>
//<pre style={{ background: "#222", color: "#0f0", padding: "10px" }}>
  //{problem.input || "No input provided"}
//</pre>

//<h3>Output</h3>
//<pre style={{ background: "#222", color: "#0f0", padding: "10px" }}>
  //{problem.output || "No output provided"}
//</pre>

//<h3>Explanation</h3>
//<p>{problem.explaination || "No explanation"}</p>
      
  //  </div>
  //);
//}
<div className="main">

      <button onClick={()=>navigate("/home")}
      style={{marginBottom:"20px",padding:"8px"}}
      >
        ⬅ Back
      </button>

      <h1>{problem.title}</h1>

      <h3>Description</h3>
      <p>{problem.description}</p>

      <h3>Input</h3>
      <div style={{background:"#222",color:"#0f0",padding:"10px"}}>
        {problem.input}
      </div>

      <h3>Output</h3>
      <div style={{background:"#222",color:"#0f0",padding:"10px"}}>
        {problem.output }
      </div>
      <h3>Explanation</h3>
      <p>{problem.explaination }</p>

    </div>
  );
}



export default Problempage;