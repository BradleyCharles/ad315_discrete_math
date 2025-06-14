"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { Funnel_Sans } from "next/font/google";

export default function Home() {
  // State to hold any input1 validation error message
  const [error, setError] = useState("");

  const [input, setInput] = useState("");
  const [powerSet, setPowerSet] = useState<string[][]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  function generatePowerSet() {
    const elements = input
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e !== "");

    const result: string[][] = [[]];

    for (const elem of elements) {
      const newSubsets = result.map((subset) => [...subset, elem]);
      result.push(...newSubsets);
    }

    setPowerSet(result);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      
        <h1>Enter a number to become a power set</h1>

        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>

          {/* Show error message in red if input1 is invalid */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter number"
            />
            {/* Show error1 message in red if input1 is invalid */}
          </div>
        </div>

        <div>
          <button onClick={generatePowerSet}>Generate Power Set</button>

          {/* Display conversion result if available */}
          {powerSet && (
            <div style={{ whiteSpace: "pre" }}>
              <h2 className="text-lg font-semibold">Power Set:</h2>
              <ul className="list-disc list-inside">
                {powerSet.map((subset, index) => (
                  <li key={index}>
                    {subset.length > 0 ? subset.join("") : "∅"}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Optional footer section */}
      <footer className={styles.footer}></footer>
    </div>
  );
}
