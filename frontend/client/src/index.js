import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Quiz from './pages/quiz.js';
import Setting from './pages/setUp.js'
import Leader from './pages/leaderboard.js'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<App /> }/>
      <Route path='setUp' element={<Setting /> }/>
      <Route path='quiz' element={<Quiz /> }/>
      <Route path='/api/leaderboard' element={<Leader />}/>
    </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
