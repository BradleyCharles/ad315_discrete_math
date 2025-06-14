"use client";
import { useState } from "react";
import styles from "./page.module.css";
import GoBackButton from "../components/GoBackButton";

export default function Home() {
  // State to hold the user-entered values
  const [firstTerm, setFirstTerm] = useState("");
  const [commonTerm, setCommonTerm] = useState("");
  const [numTerms, setNumTerms] = useState("");
  const [sequenceType, setSequenceType] = useState("1");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  // Handles input change and validates that only digits are entered
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value;
    if (/^-?\d*$/.test(value)) {
      setter(value);
      setError("");
    } else {
      setError("Please enter numbers only.");
    }
  };

  // Generates an arithmetic sequence
  const generateArithmeticSequence = (first: number, common: number, terms: number): number[] => {
    const sequence: number[] = [];
    for (let i = 0; i < terms; i++) {
      sequence.push(first + (i * common));
    }
    return sequence;
  };

  // Generates a geometric sequence
  const generateGeometricSequence = (first: number, common: number, terms: number): number[] => {
    const sequence: number[] = [];
    for (let i = 0; i < terms; i++) {
      sequence.push(first * Math.pow(common, i));
    }
    return sequence;
  };

  // Calculates the sum of an arithmetic sequence
  const calculateArithmeticSum = (first: number, common: number, terms: number): number => {
    const lastTerm = first + (terms - 1) * common;
    return (terms * (first + lastTerm)) / 2;
  };

  // Calculates the product of a geometric sequence
  const calculateGeometricProduct = (first: number, common: number, terms: number): number => {
    let product = 1;
    for (let i = 0; i < terms; i++) {
      product *= first * Math.pow(common, i);
    }
    return product;
  };

  // Generates the sequence based on selected type
  const generateSequence = () => {
    // Validate inputs
    if (!firstTerm || !commonTerm || !numTerms) {
      setError("All fields must be filled.");
      return;
    }

    const first = parseInt(firstTerm);
    const common = parseInt(commonTerm);
    const terms = parseInt(numTerms);

    if (terms <= 0) {
      setError("Number of terms must be positive.");
      return;
    }

    let sequence: number[];
    let sumOrProduct: number;
    
    if (sequenceType === "1") {
      sequence = generateArithmeticSequence(first, common, terms);
      sumOrProduct = calculateArithmeticSum(first, common, terms);
      setResult(`Arithmetic Sequence: ${sequence.join(", ")}\nSum of sequence: ${sumOrProduct}`);
    } else {
      sequence = generateGeometricSequence(first, common, terms);
      sumOrProduct = calculateGeometricProduct(first, common, terms);
      setResult(`Geometric Sequence: ${sequence.join(", ")}\nProduct of sequence: ${sumOrProduct}`);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Arithmetic and Geometric Sequence Generator</h1>

        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
          <div>
            <p>First term:</p>
            <input
              type="text"
              value={firstTerm}
              onChange={(e) => handleInputChange(e, setFirstTerm)}
              placeholder="Enter first term"
            />
            <p>Common difference/ratio:</p>
            <input
              type="text"
              value={commonTerm}
              onChange={(e) => handleInputChange(e, setCommonTerm)}
              placeholder="Enter common term"
            />
            <p>Number of terms:</p>
            <input
              type="text"
              value={numTerms}
              onChange={(e) => handleInputChange(e, setNumTerms)}
              placeholder="Enter number of terms"
            />
            <p>Select sequence:</p>
            <select
              value={sequenceType}
              onChange={(e) => setSequenceType(e.target.value)}
            >
              <option value="1">Arithmetic</option>
              <option value="2">Geometric</option>
            </select>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
        <div>
          <button onClick={generateSequence}>Generate</button>
          {result && <h2 style={{ marginTop: "1rem" }}>{result}</h2>}
        </div>
      </main>
      <GoBackButton />
    </div>
  );
}
