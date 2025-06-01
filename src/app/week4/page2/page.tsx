"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { Funnel_Sans } from "next/font/google";

export default function Home() {
  // State to hold any input1 validation error message
  const [error, setError] = useState("");

  // State to hold the base selected from the dropdown (default is 2)
  const [base1, setBase1] = useState("1");
  const [base2, setBase2] = useState("1");

  const [input, setInput] = useState("");
  const [powerSet, setPowerSet] = useState<string[][]>([]);

  // State to store the final result string after conversion
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");

  const [truthTable, setTruthTable] = useState("");

  function logicalAnd(a: boolean, b: boolean): boolean {
    return a && b;
  }

  function logicalOr(a: boolean, b: boolean): boolean {
    return a || b;
  }

  function logicalNot(a: boolean): boolean {
    return !a;
  }

  function implication(a: boolean, b: boolean): boolean {
    return !a || b;
  }

  function biconditional(a: boolean, b: boolean): boolean {
    return a === b;
  }

  function boolToInt(val: boolean): number {
    return val ? 1 : 0;
  }



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
