"use client";
import { useState } from "react";
import styles from "./page.module.css";
import * as math from "mathjs";
import GoBackButton from "../components/GoBackButton";

export default function Home() {
  // State to hold the user-entered number
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  // State to hold any input validation error message
  const [error, setError] = useState("");

  // State to hold the base selected from the dropdown (default is 2)
  const [base, setBase] = useState(2);

  // State to store the final result string after conversion
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");

  // Handles input change and validates that only digits are entered
  const handleInput1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Use regex to allow only digits (0-9)
    if (/^\d*$/.test(value)) {
      setInput1(value); // Valid input
      setError(""); // Clear any previous error
    } else {
      setError("Please enter numbers only."); // Show error on invalid input
    }
  };

  const handleInput2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Use regex to allow only digits (0-9)
    if (/^\d*$/.test(value)) {
      setInput2(value); // Valid input
      setError(""); // Clear any previous error
    } else {
      setError("Please enter numbers only."); // Show error on invalid input
    }
  };
  // Converts the entered number to the selected base
  const convertNumber = () => {
    if (!input1 || !input2) {
      setError("Input cannot be empty.");
      return;
    }

    const value1 = parseInt(input1);
    const value2 = parseInt(input2);

    const result1 = math.permutations(value1, value2);
    const result2 = math.combinations(value1, value2);

    setResult1(result1.toString());
    setResult2(result2.toString());
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Title of the app */}
        <h1>
          Enter values for n and r to calculate the permutations and
          combinations of them
        </h1>

        {/* Layout for input and dropdown side by side */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
          {/* Input box for user to enter a number */}
          <div>
            <p>Enter value for n</p>
            <input
              type="text"
              value={input1}
              onChange={handleInput1Change}
              placeholder="total items"
            />
            {/* Show error message in red if input is invalid */}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div>
            <p>Enter value for r</p>
            <input
              type="text"
              value={input2}
              onChange={handleInput2Change}
              placeholder="items to be chosen or arranged"
            />
            {/* Show error message in red if input is invalid */}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          {/* Dropdown for selecting base (from 2 to 16) */}
        </div>
        <div>
          {/* Button to trigger conversion */}
          <button onClick={convertNumber}>Do it!</button>

          {/* Display conversion result if available */}
          {result1 && (
            <h2 style={{ marginTop: "1rem" }}>
              The number of permutations is: {result1}
            </h2>
          )}
          {/* Display conversion result if available */}
          {result2 && (
            <h2 style={{ marginTop: "1rem" }}>
              The number of combinations is: {result2}
            </h2>
          )}
        </div>
      </main>
      <GoBackButton />
    </div>
  );
}
