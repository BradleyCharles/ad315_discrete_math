"use client";
import { useState } from "react";
import styles from "./page.module.css";
import GoBackButton from "../components/GoBackButton";

export default function Home() {
  // State to hold the user-entered probabilities
  const [prevalence, setPrevalence] = useState(""); // P(Disease)
  const [sensitivity, setSensitivity] = useState(""); // P(Test+|Disease+)
  const [specificity, setSpecificity] = useState(""); // P(Test-|Disease-)
  
  // State to hold any input validation error message
  const [error, setError] = useState("");

  // State to store the final results
  const [positiveResult, setPositiveResult] = useState("");
  const [negativeResult, setNegativeResult] = useState("");

  // Calculate probabilities using Bayes' Theorem
  const calculateProbabilities = () => {
    // Convert inputs to numbers
    const pDisease = parseFloat(prevalence);
    const pTestPosGivenDisease = parseFloat(sensitivity);
    const pTestNegGivenNoDisease = parseFloat(specificity);

    // Check if inputs are valid numbers
    if (isNaN(pDisease) || isNaN(pTestPosGivenDisease) || isNaN(pTestNegGivenNoDisease)) {
      setError("Please enter valid numbers for all fields");
      return;
    }

    // Check if probabilities are between 0 and 1
    if (pDisease < 0 || pDisease > 1 || pTestPosGivenDisease < 0 || pTestPosGivenDisease > 1 || 
        pTestNegGivenNoDisease < 0 || pTestNegGivenNoDisease > 1) {
      setError("Probabilities must be between 0 and 1");
      return;
    }

    // Calculate P(Test+|Disease-) (false positive rate)
    const pTestPosGivenNoDisease = 1 - pTestNegGivenNoDisease;
    
    // Calculate P(Test+) = P(Test+|Disease+) * P(Disease) + P(Test+|Disease-) * P(No Disease)
    const pTestPos = (pTestPosGivenDisease * pDisease) + (pTestPosGivenNoDisease * (1 - pDisease));
    
    // Calculate P(Test-) = P(Test-|Disease+) * P(Disease) + P(Test-|Disease-) * P(No Disease)
    const pTestNeg = ((1 - pTestPosGivenDisease) * pDisease) + (pTestNegGivenNoDisease * (1 - pDisease));

    // Calculate P(Disease+|Test+) using Bayes' Theorem
    const pDiseaseGivenTestPos = (pTestPosGivenDisease * pDisease) / pTestPos;
    
    // Calculate P(Disease+|Test-) using Bayes' Theorem
    const pDiseaseGivenTestNeg = ((1 - pTestPosGivenDisease) * pDisease) / pTestNeg;

    setPositiveResult(`P(Disease+|Test+) = ${(pDiseaseGivenTestPos * 100).toFixed(2)}%`);
    setNegativeResult(`P(Disease+|Test-) = ${(pDiseaseGivenTestNeg * 100).toFixed(2)}%`);
    setError("");
  };

  // Handles input change and validates that only valid probabilities are entered
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputName = e.target.name;

    // Allow numbers between 0 and 1 with up to 4 decimal places
    if (/^\d*\.?\d{0,4}$/.test(value) && (value === "" || parseFloat(value) <= 1)) {
      switch (inputName) {
        case "prevalence":
          setPrevalence(value);
          break;
        case "sensitivity":
          setSensitivity(value);
          break;
        case "specificity":
          setSpecificity(value);
          break;
      }
      setError("");
    } else {
      setError("Please enter valid probabilities between 0 and 1");
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ display: "flex",  flexDirection: "column", gap: "1rem", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
          <h1>Baye's Theorem</h1>
          <h2>Disease Testing Probability Calculator</h2>
        </div>
        

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px", margin: "0 auto" }}>
          <div>
            <label htmlFor="prevalence">Prevalence of Disease (P(Disease)):</label>
            <input
              type="text"
              id="prevalence"
              name="prevalence"
              value={prevalence}
              onChange={handleInputChange}
              placeholder="e.g., 0.01 for 1%"
              style={{ width: "135px" }}
            />
          </div>

          <div>
            <label htmlFor="sensitivity">Sensitivity (P(Test+|Disease+)):</label>
            <input
              type="text"
              id="sensitivity"
              name="sensitivity"
              value={sensitivity}
              onChange={handleInputChange}
              placeholder="e.g., 0.95 for 95%"
              style={{ width: "135px" }}
            />
          </div>

          <div>
            <label htmlFor="specificity">Specificity (P(Test-|Disease-)):</label>
            <input
              type="text"
              id="specificity"
              name="specificity"
              value={specificity}
              onChange={handleInputChange}
              placeholder="e.g., 0.98 for 98%"
              style={{ width: "135px" }}
            />
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <h2>Bayes' Theorem Results</h2>
          <button onClick={calculateProbabilities} style={{ marginBottom: "1rem" }}>
            Calculate Probabilities
          </button>
          
          {positiveResult && (
            <div style={{ marginBottom: "1rem" }}>
              <h3>If Test is Positive:</h3>
              <p>{positiveResult}</p>
            </div>
          )}
          
          {negativeResult && (
            <div>
              <h3>If Test is Negative:</h3>
              <p>{negativeResult}</p>
            </div>
          )}
        </div>
      </main>
      <GoBackButton />
    </div>
  );
}
