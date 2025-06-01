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
    const coin = Math.random();
    if (coin > 0.5) {
      setResult1("Heads");
    } else {
      setResult1("Tails");
    }
  }
  function probabilityDice() {
    const dice = Math.floor(Math.random() * 6) + 1;
    const diceRoll = "You rolled a " + dice;
    setResult2(diceRoll);
  }
  function probabilityCard() {
    const card = Math.floor(Math.random() * 13) + 1;
  }
  function probability2Coin() {}

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
          {result1 && <h2 style={{ marginTop: "1rem" }}>{result1}</h2>}
          {result2 && <h2 style={{ marginTop: "1rem" }}>{result2}</h2>}
          {result3 && <h2 style={{ marginTop: "1rem" }}>{result3}</h2>}
          {result4 && <h2 style={{ marginTop: "1rem" }}>{result4}</h2>}
          {result5 && <h2 style={{ marginTop: "1rem" }}>{result5}</h2>}
        </div>
      </main>

      {/* Optional footer section */}
      <footer className={styles.footer}></footer>
    </div>
  );
}
