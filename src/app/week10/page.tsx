"use client";
import { useState } from "react";
import styles from "./page.module.css";
import GoBackButton from "../components/GoBackButton";

export default function Home() {
  // State to store the final result string after conversion
  const [result, setResult] = useState("");

 const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

    // Generates an array of 25 random numbers between 0 and 99
  const generateRandomNumbers = () => {
    const numbers: number[] = [];
    for (let i = 0; i < 25; i++) {
      numbers.push(Math.floor(Math.random() * 100));
    }
    setRandomNumbers(numbers);
    setResult(`Random Numbers: ${numbers.join(", ")}`);
  };

const randomArray = findMax(randomNumbers);

function findMax(numbers: number[]): number {
    let maxNum: number = numbers[0];
    for (let num of numbers) {
        if (num > maxNum) {
            maxNum = num;
        }
    }
    return maxNum;
}

function printPairs(array: number[]): string {
    let pairs: string[] = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            pairs.push(`(${array[i]}, ${array[j]})`);
        }
    }
    return pairs.join(", ");
}

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Title of the app */}
        <h1>Analyzing Time and Space Complexity</h1>

        <div>
          {/* Button to trigger conversion */}
          <button onClick={() => {
            generateRandomNumbers();
            const max = randomArray;
            setResult(`Complexity Analysis:\nTime Complexity: O(n) - we iterate through the array once\nSpace Complexity: O(1) - we only use a single variable to store the max\n\nNumbers: [${randomNumbers.join(", ")}]\n\nMaximum number is: ${max}`);
          }}>Find Max</button> 
        </div>

        <div>
          {/* Button to trigger conversion */}
          <button onClick={() => {
            generateRandomNumbers();
            const pairs = printPairs(randomNumbers);
            setResult(`Complexity Analysis:\nTime Complexity: O(n²) - we use nested loops to generate all pairs\nSpace Complexity: O(n²) - we store all possible pairs in an array\n\nNumbers: [${randomNumbers.join(", ")}]\n\nPairs: [${pairs}]`);
          }}>Find Pairs</button>

          {/* Display conversion result if available */}
          {result && <h2 style={{ marginTop: "1rem", whiteSpace: "pre-line" }}>{result}</h2>}
        </div>
      </main>
      <GoBackButton />
    </div>
  );
}
