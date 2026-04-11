import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/problems`)
      .then((res) => {
        const found = res.data.find((p) => p._id === id);
        setProblem(found);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!problem) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{problem.title}</h1>
      <h3>Description</h3>
      <p>{problem.description}</p>
      <h3>Solution</h3>
      <p>{problem.solution}</p>
      <h3>Explanation(teacher style)</h3>
      <p>{problem.explaination}</p>
      <p><b>Difficulty:</b> {problem.difficulty}</p>
    </div>
  );
}

export default ProblemDetail;