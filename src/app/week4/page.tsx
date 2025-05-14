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

  const A = base1 === "1";
  const B = base2 === "1";

  function logicalOperators() {
    const output = `
    A AND B: ${boolToInt(logicalAnd(A, B))}
    A OR B: ${boolToInt(logicalOr(A, B))}
    NOT A: ${boolToInt(logicalNot(A))}
    NOT B: ${boolToInt(logicalNot(B))}
    A → B (IF A THEN B): ${boolToInt(implication(A, B))}
    A ↔ B (IF AND ONLY IF): ${boolToInt(biconditional(A, B))}
  `;
    setResult1(output);
  }

  function generateTruthTable(): void {
    const rows = [["A", "B", "AND", "OR", "NOT A", "NOT B", "A → B", "A ↔ B"]];

    for (let a = 0; a <= 1; a++) {
      for (let b = 0; b <= 1; b++) {
        const A = Boolean(a);
        const B = Boolean(b);
        rows.push([
          a.toString(),
          b.toString(),
          boolToInt(A && B).toString(),
          boolToInt(A || B).toString(),
          boolToInt(!A).toString(),
          boolToInt(!B).toString(),
          boolToInt(!A || B).toString(),
          boolToInt(A === B).toString(),
        ]);
      }
    }

    // Format output with columns aligned
    const formatted = rows
      .map((row) => row.map((cell) => cell.padEnd(7)).join(""))
      .join("\n");

    setTruthTable(formatted);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Title of the app */}
        <h1>Select a value for A and B</h1>

        {/* Layout for input1 and dropdown side by side */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
          {/* Input1 box for user to enter a number */}

          {/* Show error message in red if input1 is invalid */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Dropdown for selecting base (from 2 to 16) */}
          <div>
            <p>Value A</p>
            <select value={base1} onChange={(e) => setBase1(e.target.value)}>
              <option value={1}>TRUE</option>
              <option value={0}>FALSE</option>
            </select>
          </div>
          <div>
            <p>Value B</p>
            <select value={base2} onChange={(e) => setBase2(e.target.value)}>
              <option value={1}>TRUE</option>
              <option value={0}>FALSE</option>
            </select>
          </div>
        </div>
        <div>
          {/* Button to trigger conversion */}
          <button onClick={logicalOperators}>Logical Operator</button>

          {/* Display conversion result if available */}
          {result1 && (
            <div
              style={{
                whiteSpace: "pre",
              }}
            >
              {result1}
            </div>
          )}
        </div>
        <div>
          <button onClick={generateTruthTable}>Generate Truth Table</button>

          {truthTable && (
            <pre style={{ marginTop: "1rem" }}>
              <p>{truthTable}</p>
            </pre>
          )}

          {/* Display conversion result if available */}
          {result2 && (
            <div
              style={{
                whiteSpace: "pre",
              }}
            >
              {result2}
            </div>
          )}
        </div>
      </main>

      {/* Optional footer section */}
      <footer className={styles.footer}></footer>
    </div>
  );
}
