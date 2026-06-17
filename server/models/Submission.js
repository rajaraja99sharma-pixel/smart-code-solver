import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  userId: String,
  problemId: String,
  code: String,
  output: String,
  status: String, // Passed / Failed
}, { timestamps: true });

export default mongoose.model("Submission", submissionSchema);