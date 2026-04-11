//import React, { useState } from "react";
import react from "react";
import Landing from "./pages/Landing";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
//import{ Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import ProblemPage from "./pages/Problempage";
import"./styles.css";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Signup from "./pages/signup";
function App() {
  //const [selectedId, setSelectedId] = useState(null);

  return (
    //<BrowserRouter>
    <Router>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/problem/:id" element={<ProblemPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/admin" element={<Admin/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </Router>
  );
}

export default App;