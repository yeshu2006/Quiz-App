import axios from 'axios';
import { useEffect, useState } from 'react';
import './leader.css';

export default function Leader() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get('https://quiz-app-fbe1.onrender.com/leaderboard')
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((er) => {
        console.error(er);
      });
  }, []);
  return (
    <>
      <div className='leaderboard-container'>
        <div className='leaderboard-head'>
          <h2 className='leaderboard-title'>TOP SCORERS</h2>
        </div>
        <div className='cont-data'>
          <table>
                <tr>
                  <th>Position</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Level</th>
                </tr>
                {user.map((val, key) => {
                    return (
                        <tr key={key}>
                          <td>{key+1}</td>
                            <td>{val.user}</td>
                            <td>{val.score}</td>
                            <td>{val.level.toUpperCase()}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
      </div>
    </>
  );
}
