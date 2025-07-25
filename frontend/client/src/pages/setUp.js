import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate ,Link} from "react-router-dom";
import './setUp.css'
export default function Setting() {
  const loc = useLocation();
  const nav=useNavigate();
  const { user } = loc.state || {};
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [level, setLevel] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then((res) => {
        setCategories(res.data.trivia_categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleNumQuestionsChange = (e) => {
    setNumQuestions(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category ID:", selectedCategory);
    console.log("Difficulty Level:", level);
    console.log("Number of Questions:", numQuestions);
    nav('https://quiz-app-fbe1.onrender.com/quiz',{
      state:{
        user:user,
        cat:selectedCategory,
        level:level,
        ques:numQuestions,
      }
    })
    
  };

  return (
  <div className="setting-container">
  <h2>Welcome, {user}</h2>
  <Link to='/api/leaderboard'>LeaderBoard</Link>
  <form onSubmit={handleSubmit}>
    <label htmlFor="cat">Select Category:</label>
    <select name="cat" onChange={handleCategoryChange} value={selectedCategory} required >
      <option value="">Choose Category</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>

    <label htmlFor="level">Select Difficulty Level:</label>
    <select name="level" onChange={handleLevelChange} value={level} required >
      <option value="">Choose Level</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>

    <label htmlFor="num">Number of Questions:</label>
    <select name="num" onChange={handleNumQuestionsChange} value={numQuestions} required>
      <option value="">Choose Number</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </select>

    <button type="submit">Start Quiz</button>
  </form>
</div>

  );
}
