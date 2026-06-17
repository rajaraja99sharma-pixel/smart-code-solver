console.log("SERVER FILE RUNNING...");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import Problem from "./models/Problem.js";
import Submission from "./models/Submission.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users",userRoutes);
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
//get total problem
app.get("/api/problems-count",async(req,res)=>{
  try{
    const count=await 
    Problem.countDocuments();
    res.json({totalProblems:count});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});

//delete problem
app.delete("/api/problems/:id",async(req,res)=>{
  try{
    const deleted=await Problem.findByIdAndDelete(req.params.id);
    if(!deleted){
      return res.status(404).json({error:"Problem not found"});
    }
    res.json({message:"Problem deleted successfully"});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});

app.put("/api/problems/:id",async(req,res)=>{
  const updated=await Problem.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.json(updated);
})
// ✅ SAVE SUBMISSION
app.post("/api/submit", async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.json({ msg: "Saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/solved/:userId", async (req, res) => {
  try {
    const submissions = await Submission.find({
      userId: req.params.userId,
      status: "✅ Passed"
    });

    // सिर्फ problemId निकालो
    const solvedIds = submissions.map(s => s.problemId.toString());

    res.json(solvedIds);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 🚀 Start Server (LAST) */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});