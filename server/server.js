console.log("SERVER FILE RUNNING...");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import Problem from "./models/Problem.js";
//const express = require("express");
//const mongoose = require("mongoose");
//const cors = require("cors");
//const Problem = require("./models/Problem");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);

/* 🔗 MongoDB Connection */
mongoose.connect("mongodb://127.0.0.1:27017/codesolver") 
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* 🧪 Test Route */
// ✅ GET ALL PROBLEMS
app.get("/api/problems", async (req, res) => {
  try {
    const problems = await Problem.find({}, "title difficulty");
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET SINGLE PROBLEM
app.get("/api/problems/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/problems",async(req,res)=>{
  const data=await Problem.find();
  res.json(data);
});
app.get("/api/problem/:id",async(req,res)=>{
  const data=await problem.findById(req.params.id);
  res.json(data);
});
/* ✅ POST API (MOVE HERE) */
app.post("/api/problems", async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//const userRoutes=require("./routes/userRoutes");
app.use("/api/users",userRoutes);


/* 🚀 Start Server (LAST) */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});