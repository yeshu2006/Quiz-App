import React, { useState, useEffect } from "react";
import { useLocation,Link } from "react-router-dom";
import axios from 'axios';
import './quiz.css'
export default function Quiz() {
  const [index, setIndex] = useState(0);
  const loc = useLocation();
  const { cat, level, ques,user } = loc.state || {};
  const [q, setQ] = useState([]);
  const [choices, setChoices] = useState([]);
  const [select, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const api = `https://opentdb.com/api.php?amount=${ques}&category=${cat}&difficulty=${level}&type=multiple`;
  function shuffleChoices(correct, incorrect) {
    const choices = [correct, ...incorrect];
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    return choices;
  }
  useEffect(() => {
    axios.get(api)
      .then((response) => {
        setQ(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [api]);
  useEffect(() => {
    if (q.length > 0 && q[index]) {
      const current = q[index];
      const shuffled = shuffleChoices(current.correct_answer, current.incorrect_answers);
      setChoices(shuffled);
    }
  }, [q, index]);
  useEffect(() => {
    setSelected('');
  }, [choices]);
  const handleIndex = () => {
    if (select === q[index].correct_answer) {
      setScore(score + 1);
    }
    setIndex(index + 1);
    setSelected('');
  };
  const handleSubmit = () => {
    if (select === q[index].correct_answer) {
      setScore(score + 1);
    }
    setSubmitted(true);
     
    axios.post('/api/quiz',{
      score:score,
      level:level,
      user:user
    }).then((res)=>{
      console.log("Score Saved")
    }).catch((error)=>{
      console.log(error)
    })
    
  };
  const isLastQuestion = index === Number(ques) - 1;
  if (submitted) {
   
  return (
  <div className="quiz-container">
    <Link to='/api/leaderboard'>LeaderBoard</Link>
    <h2>Quiz Completed!</h2>
    <p className="score">Your Score: {score} / {ques}</p>
  </div>
);
  }
  
  return (
    <div className="quiz-container">
       <Link to='/api/leaderboard'>LeaderBoard</Link>
      <p dangerouslySetInnerHTML={{ __html: q[index]?.question }} />
      {choices.map((opt, i) => (
        <label key={i}>
          <input
            type="radio"
            name="option"
            value={opt}
            checked={select === opt}
            onChange={() => setSelected(opt)}
          />
          <span dangerouslySetInnerHTML={{ __html: opt }} />
          <br />
        </label>
      ))}
      <br />
      {isLastQuestion ? (
        <button onClick={handleSubmit} disabled={!select}>Submit</button>
      ) : (
        <button onClick={handleIndex} disabled={!select}>Next</button>
      )}
    </div>
  );
}
