import logo from './logo.svg';
import './App.css';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TypeRacer from './Componenets/TypeRacer';
import facts from './facts.json'
function App() {
  const randomFactNo = Math.floor((Math.random() * facts.facts.length))
  const randomFact = facts.facts[randomFactNo];
  return (
    <div className="App">
      <header className="App-header">
        <TypeRacer fact={randomFact}></TypeRacer>

      </header>

    </div>
  );
}

export default App;
