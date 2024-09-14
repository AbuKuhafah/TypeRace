import logo from './logo.svg';
import './App.css';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TypeRacer from './Componenets/TypeRacer';
import facts from './facts.json'
function App() {
  const [currentFact, setCurrentFact] = useState(getRandomFact);

  function getRandomFact() {
    const randomFactNo = Math.floor((Math.random() * facts.facts.length));
    return facts.facts[randomFactNo];
  }

  const handleRetry = () => {
    setCurrentFact(getRandomFact());
  };

  return (
    <div className="App">
      <header className="App-header">
        <TypeRacer fact={currentFact} onRetry={handleRetry} />
      </header>
    </div>
  );
}

export default App;
