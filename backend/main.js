import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import User from "./User.js";
const app=express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
let connection = false;
const mongoURI = 'mongodb+srv://yeshwanth3006:LpoQe3wYjZC2sZMc@scoreboard.zyzaaks.mongodb.net/?retryWrites=true&w=majority&appName=ScoreBoard';
import path from 'path';
app.use(express.static(path.join(__dirname, '../frontend/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/client/build', 'index.html'));
});
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    connection = true;
    console.log("MongoDB Connected");
})
.catch((error) => {
    connection = false;
    console.error("❌ MongoDB Connection Failed", error);
});
app.post('/user',(req,res)=>{
    const user=req.body;
    console.log(user);
})
app.post('/api/quiz', async (req,res)=>{
    const {score,user,level}=req.body;
    const data=await User.create({
        score:score,
        user:user,
        level:level});
}
)
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ mess: "Success", user: users }); 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mess: "Server error" }); 
  }
});

app.listen(3050,()=>{
    console.log("OK");
})
