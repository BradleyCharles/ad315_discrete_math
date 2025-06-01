"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function DiceProbability() {
  const [numSides, setNumSides] = useState(6);
  const [numDice, setNumDice] = useState(2);
  const [numRolls, setNumRolls] = useState(1000);
  const [results, setResults] = useState<string>("");
  const [distribution, setDistribution] = useState<{[key: number]: number}>({});

  // Task 1: Roll M N-sided dice once and return sum
  function rollDice(n: number, m: number): number {
    let sum = 0;
    for (let i = 0; i < m; i++) {
      sum += Math.floor(Math.random() * n) + 1;
    }
    return sum;
  }

  // Task 2: Simulate K rolls of M N-sided dice
  function simulateRolls(n: number, m: number, k: number): number[] {
    const outcomes: number[] = [];
    for (let i = 0; i < k; i++) {
      outcomes.push(rollDice(n, m));
    }
    return outcomes;
  }

  // Task 3: Calculate probability distribution
  function calculateDistribution(outcomes: number[]): {[key: number]: number} {
    const dist: {[key: number]: number} = {};
    const total = outcomes.length;

    // Count occurrences of each sum
    outcomes.forEach(sum => {
      dist[sum] = (dist[sum] || 0) + 1;
    });

    // Convert counts to probabilities
    Object.keys(dist).forEach(key => {
      const numKey = Number(key);
      dist[numKey] = (dist[numKey] / total) * 100;
    });

    return dist;
  }

  // Task 4: Handle simulation and display results
  function runSimulation() {
    // Validate inputs
    if (numSides < 1 || numDice < 1 || numRolls < 1) {
      setResults("Please enter valid numbers (greater than 0)");
      return;
    }

    // Run simulation
    const outcomes = simulateRolls(numSides, numDice, numRolls);
    const dist = calculateDistribution(outcomes);

    // Format results
    let resultText = `Simulation Results (${numRolls} rolls of ${numDice} ${numSides}-sided dice):\n\n`;
    resultText += "Sum | Count | Probability\n";
    resultText += "------------------------\n";

    // Sort sums for display
    const sortedSums = Object.keys(dist).map(Number).sort((a, b) => a - b);
    
    sortedSums.forEach(sum => {
      const count = Math.round((dist[sum] / 100) * numRolls);
      resultText += `${sum.toString().padStart(3)} | ${count.toString().padStart(5)} | ${dist[sum].toFixed(2)}%\n`;
    });

    setResults(resultText);
    setDistribution(dist);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>N-sided Dice Probability Calculator</h1>
        
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Number of sides (N): </label>
            <input 
              type="number" 
              value={numSides} 
              onChange={(e) => setNumSides(Number(e.target.value))}
              min="1"
            />
          </div>
          
          <div style={{ marginBottom: "1rem" }}>
            <label>Number of dice (M): </label>
            <input 
              type="number" 
              value={numDice} 
              onChange={(e) => setNumDice(Number(e.target.value))}
              min="1"
            />
          </div>
          
          <div style={{ marginBottom: "1rem" }}>
            <label>Number of rolls (K): </label>
            <input 
              type="number" 
              value={numRolls} 
              onChange={(e) => setNumRolls(Number(e.target.value))}
              min="1"
            />
          </div>
          
          <button onClick={runSimulation}>Run Simulation</button>
        </div>

        {results && (
          <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {results}
          </div>
        )}
      </main>
    </div>
  );
} 