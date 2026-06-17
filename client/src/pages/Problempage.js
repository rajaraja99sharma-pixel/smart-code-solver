/*

export default Problempage; */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/problem.css";

function Problempage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [result, setResult] = useState(""); // ✅ pass/fail

  useEffect(() => {
    axios.get(`http://localhost:5000/api/problems/${id}`)
      .then(res => setProblem(res.data))
      .catch(err => console.log(err));
  }, [id]);
  
const runCode = () => {
  const worker = new Worker("/worker.js");

  worker.postMessage({
    code: code,
    input: input
  });

  worker.onmessage = (e) => {
    const res = e.data;
    setOutput(res);

    const clean = (val) =>
      String(val).trim().replace(/\s+/g, " ");

    if (clean(problem.output).includes(clean(res))) {
      setResult("✅ Passed");
    } else {
      setResult("❌ Failed");
    }
  };
};
const submitCode = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
if(!user || !problem){
  alert("user or problem missing");
  return ;
}
  await axios.post("http://localhost:5000/api/submit", {
    userId: user._id,
    problemId: problem._id,
    code,
    output,
    status: result
  });

  alert("Submitted ✅");
};
  if (!problem) return <p>Loading...</p>;

  return (
    <div className="problem-container">

      {/* BACK */}
      <button className="back-btn" onClick={() => navigate("/home")}>
        ⬅ Back
      </button>

      <div className="layout">

        {/* LEFT SIDE */}
        <div className="left">

          <h1>{problem.title}</h1>
          <p className="difficulty">{problem.difficulty}</p>

          <h3>Description</h3>
          <p>{problem.description}</p>

          <h3>Input</h3>
          <pre>{problem.input}</pre>

          <h3>Output</h3>
          <pre>{problem.output}</pre>

          <h3>Explanation</h3>
          <p>{problem.explaination}</p>

        </div>

        {/* RIGHT SIDE */}
        <div className="right">

          <h3>Code Editor</h3>

          <textarea
            className="editor"
            placeholder="Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <h4>Custom Input</h4>
          <textarea
            className="input-box"
            placeholder="Enter input..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="run-btn" onClick={runCode}>
            ▶ Run Code
          </button>
<button 
  onClick={submitCode}
  disabled={result !== "✅ Passed"}
  style={{
    background: result === "✅ Passed" ? "green" : "gray",
    cursor: result === "✅ Passed" ? "pointer" : "not-allowed"
  }}
>
  🚀 Submit Code
</button>

          <h4>Output</h4>
          <pre className="output-box">{output}</pre>

          {/* ✅ RESULT */}
          <h3>{result}</h3>

        </div>

      </div>
    </div>
  );
}

export default Problempage;