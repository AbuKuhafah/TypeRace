import './App.css';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TypeRacer from './Componenets/TypeRacer';
import Leaderboard from './Componenets/LeaderBoard.js';
import facts from './facts.json'
import { getFact } from './data/repo.js';
function App() {
  const [currentFact, setCurrentFact] = useState('Fetching Fact');

  const fetchFact = async () => {
    try {
      const fact = await getFact();
      setCurrentFact(fact);
      console.log("facts.facts[randomFactNo]: " + currentFact);
    } catch (error) {
      console.error("Error fetching fact:", error);
      setCurrentFact('Failed to fetch fact'); 
    }
  };

  useEffect(() => {
    fetchFact();
  }, []);

  // function getRandomFact() {
  //   const randomFactNo = Math.floor((Math.random() * facts.facts.length));
  //   console.log("facts.facts[randomFactNo]: " + facts.facts[randomFactNo]);
  //   return facts.facts[randomFactNo];
  // }

  

  const handleRetry = () => {
    // setCurrentFact(getRandomFact());
    fetchFact();
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <Leaderboard /> */}
        <TypeRacer fact={currentFact} onRetry={handleRetry} />
      </header>
    </div>
  );
}

export default App;
