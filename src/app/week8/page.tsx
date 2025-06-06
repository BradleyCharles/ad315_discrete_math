"use client";
import { useState } from "react";
import styles from "./page.module.css";
import GoBackButton from "../components/GoBackButton";

export default function Home() {
  // State to hold the user-entered number
  const [input, setInput] = useState("");

  // State to hold any input validation error message
  const [error, setError] = useState("");

  // State to hold the base selected from the dropdown (default is 2)
  const [base, setBase] = useState(2);

  // State to store the final result string after conversion
  const [result, setResult] = useState("");

  // Handles input change and validates that only digits are entered
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Use regex to allow only digits (0-9)
    if (/^\d*$/.test(value)) {
      setInput(value); // Valid input
      setError(""); // Clear any previous error
    } else {
      setError("Please enter numbers only."); // Show error on invalid input
    }
  };

  // Converts the entered number to the selected base
  const convertNumber = () => {
    // Check if input is empty
    if (!input) {
      setError("Input cannot be empty.");
      return;
    }

    // Parse input as a base-10 integer
    const num = parseInt(input, 10);

    // Convert the number to the selected base and make letters uppercase (for Hex)
    const converted = num.toString(base).toUpperCase();

    // Set the final result string to display
    setResult(`${input} in base ${base} is ${converted}`);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Title of the app */}
        <h1>Enter a number and select the base to convert it to</h1>

        {/* Layout for input and dropdown side by side */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
          {/* Input box for user to enter a number */}
          <div>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter number"
            />
            {/* Show error message in red if input is invalid */}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          {/* Dropdown for selecting base (from 2 to 16) */}
          <div>
            <select
              value={base}
              onChange={(e) => setBase(parseInt(e.target.value))}
            >
              {/* Generate base options dynamically */}
              {Array.from({ length: 15 }, (_, i) => i + 2).map((b) => (
                <option key={b} value={b}>
                  Base {b}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          {/* Button to trigger conversion */}
          <button onClick={convertNumber}>Convert</button>

          {/* Display conversion result if available */}
          {result && <h2 style={{ marginTop: "1rem" }}>{result}</h2>}
        </div>
      </main>
      <GoBackButton />
    </div>
  );
}
