"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  // State to store the final result string after conversion
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");
  const [result4, setResult4] = useState("");
  const [result5, setResult5] = useState("");

  function probabilityCoin() {
    let heads = 0;
    let tails = 0;
    
    for (let i = 0; i < 100; i++) {
      const coin = Math.random();
      if (coin > 0.5) {
        heads++;
      } else {
        tails++;
      }
    }
    
    setResult1(`After 100 flips:\nHeads: ${heads}\nTails: ${tails}`);
  }
  function probabilityDice() {
    // Initialize array to count frequency of each number (1-6)
    const frequencies = [0, 0, 0, 0, 0, 0];
    
    // Roll 60 times
    for (let i = 0; i < 60; i++) {
      const roll = Math.floor(Math.random() * 6) + 1;
      frequencies[roll - 1]++;
    }
    
    // Create visual representation of frequencies
    let result = "Rolling 60 times:\n";
    frequencies.forEach((count, index) => {
      const number = index + 1;
      const percentage = ((count / 60) * 100).toFixed(1);
      result += `${number}: ${count} times (${percentage}%)\n`;
    });
    
    setResult2(result);
  }
  function probabilityCard() {
    let redCount = 0;
    let blackCount = 0;
    
    // Draw 20 cards
    for (let i = 0; i < 20; i++) {
      // Generate random number 1-52 (representing all cards in deck)
      const card = Math.floor(Math.random() * 52) + 1;
      // Cards 1-26 are red (hearts and diamonds), 27-52 are black (spades and clubs)
      if (card <= 26) {
        redCount++;
      } else {
        blackCount++;
      }
    }
    
    const redPercentage = ((redCount / 20) * 100).toFixed(1);
    const blackPercentage = ((blackCount / 20) * 100).toFixed(1);
    
    setResult3(`Drawing 20 cards:\nRed cards: ${redCount} (${redPercentage}%)\nBlack cards: ${blackCount} (${blackPercentage}%)`);
  }
  function probability2Coin() {
    let bothHeads = 0;
    let atLeastOneHead = 0;
    
    // Flip two coins 50 times
    for (let i = 0; i < 50; i++) {
      const coin1 = Math.random() > 0.5; // true for heads, false for tails
      const coin2 = Math.random() > 0.5;
      
      if (coin1 && coin2) {
        bothHeads++;
      }
      if (coin1 || coin2) {
        atLeastOneHead++;
      }
    }
    
    const bothHeadsPercentage = ((bothHeads / 50) * 100).toFixed(1);
    const atLeastOneHeadPercentage = ((atLeastOneHead / 50) * 100).toFixed(1);
    
    setResult4(`Flipping two coins 50 times:\nBoth Heads: ${bothHeads} times (${bothHeadsPercentage}%)\nAt Least One Head: ${atLeastOneHead} times (${atLeastOneHeadPercentage}%)`);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Title of the app */}
        <h1>Enter a number and select the base to convert it to</h1>

        <div>
          {/* Buttons */}
          <button onClick={probabilityCoin}>Flip a coin</button>{" "}
          <button onClick={probabilityDice}>Roll a dice</button>{" "}
          <button onClick={probabilityCard}>Draw a card</button>{" "}
          <button onClick={probability2Coin}>Flip 2 coins</button>{" "}
          {/* Display conversion result if available */}
          {result1 && <h2 style={{ marginTop: "1rem", whiteSpace: 'pre-wrap' }}>{result1}</h2>}
          {result2 && <h2 style={{ marginTop: "1rem", whiteSpace: 'pre-wrap' }}>{result2}</h2>}
          {result3 && <h2 style={{ marginTop: "1rem", whiteSpace: 'pre-wrap' }}>{result3}</h2>}
          {result4 && <h2 style={{ marginTop: "1rem", whiteSpace: 'pre-wrap' }}>{result4}</h2>}
          {result5 && <h2 style={{ marginTop: "1rem", whiteSpace: 'pre-wrap' }}>{result5}</h2>}
        </div>
      </main>

      {/* Optional footer section */}
      <footer className={styles.footer}></footer>
    </div>
  );
}
