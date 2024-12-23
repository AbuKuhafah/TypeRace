import React, { useState, useEffect } from 'react';
import './leaderBoard.css';
import { getTopAcc, getTopWpm } from '../data/repo';

const Leaderboard = ({ retryCheck }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [retryChecker, setRetryChecker] = useState(retryCheck)
  const fetchLeaderboard = async () => {
    const data = await getTopWpm();
    setLeaderboard(data);
  };
  useEffect(() => {
    fetchLeaderboard();
  }, []);


  useEffect(() => {
    if (retryCheck) {
      fetchLeaderboard();
    }
  }, [retryCheck]);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Accuracy (%)</th>
            <th>WPM</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((race, index) => (
            <tr key={race.id}>
              <td>{index + 1}</td>
              <td>{race.accuracy.toFixed(2)}</td>
              <td>{race.wpm.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
