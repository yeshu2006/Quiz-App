import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import User from "./User.js";
const app=express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoURI = 'mongodb+srv://yeshwanth3006:LpoQe3wYjZC2sZMc@scoreboard.zyzaaks.mongodb.net/?retryWrites=true&w=majority&appName=ScoreBoard';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((error) => {
  console.error("❌ MongoDB Connection Failed", error);
});

app.post('/', (req, res) => {
  const user = req.body;
  console.log(user);
  res.status(200).json({ msg: "User received" });
});

app.post('/quiz', async (req, res) => {
  try {
    const { score, user, level } = req.body;
    const data = await User.create({ score, user, level });
    res.status(201).json({ msg: "Score saved", data });
  } catch (err) {
    console.error("Error saving quiz data", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ mess: "Success", user: users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mess: "Server error" });
  }
});
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});