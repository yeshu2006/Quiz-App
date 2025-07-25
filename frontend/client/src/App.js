import React, { useState } from 'react';
import './App.css';
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const handleUserChange = (e) => {
    setUser(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User submitted:", user);
    navigate('setUp',{
      state:{
      user : user
      }
    });
      try{
        const rest=await
        axios.post('/user',{
        user:user}
      );
      console.log(rest.data)
    }
    catch(error){
      console.log(error);
    }
  };
  return (
    <>
      <div id='main-cont'>
        <div id='header'>
        <h1>Go-Quiz</h1>
        <Link to='/api/leaderboard' id='link'>LeaderBoard</Link>
        </div>
        <div id='container'>
          <h3>Welcome to QuizGo!</h3>
          <p>Challenge your mind and track your progress — no sign-up required!</p>
          <ul>
            <li>Just enter your username to begin.</li>
            <li>Choose a category that interests you: Science, History, Tech & more.</li>
            <li>Pick a difficulty level — Easy, Medium, or Hard.</li>
            <li>Start the quiz and answer multiple-choice questions.</li>
            <li>Navigate with the Next button, and hit Submit when you're done.</li>
            <li>Get a detailed scorecard showing correct answers and total score.</li>
            <li>Compete with others — check out the Leaderboard to see top performers!</li>
            <li>Enter your name, select your quiz, and let's begin!</li>      
          </ul>
        </div>
        <div id='form'>
     <form id='uname' onSubmit={handleSubmit}>
          <input
            type='text'
            name='uname'
            placeholder='Enter your name'
            value={user}
            onChange={handleUserChange}
            required
          />
          <input type='submit' value='Start Quiz' />
        </form>
        </div>
      </div> 
    </>
  );
}

export default App;
