"use client";
import { useState } from "react";
import styles from "./page.module.css";
import GoBackButton from "../components/GoBackButton";

export default function Home() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");

  const [base2, setBase2] = useState("+");

  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");
  const [result4, setResult4] = useState("");
  const [result5, setResult5] = useState("");
  const [result6, setResult6] = useState("");
  const [result7, setResult7] = useState("");
  const [result8, setResult8] = useState("");
  const [result9, setResult9] = useState("");
  const [result10, setResult10] = useState("");

  const posInf = 1 / 0; // Positive Infinity
  const negInf = -1 / 0; // Negative Infinity
  const nanVal = 0 / 0; // NaN

  const overflow = 1e308 * 10; // Exceeds max safe float
  const underflow = 1e-324 / 10; // Smaller than min representable number

  const handleInput1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow digits and at most one decimal point
    if (/^-?\d*\.?\d*$/.test(value)) {
      setInput1(value);
      setError1("");
    } else {
      setError1("Please enter a valid float number.");
    }
  };

  const handleInput2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^-?\d*\.?\d*$/.test(value)) {
      setInput2(value);
      setError2("");
    } else {
      setError2("Please enter a valid float number.");
    }
  };

  const handleInput3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^-?\d*\.?\d*$/.test(value)) {
      setInput3(value);
      setError3("");
    } else {
      setError3("Please enter a valid float number.");
    }
  };

  function floatToIEEE754Binary(num: number) {
    // Create a Float32Array with one element
    const floatArray = new Float32Array(1);
    floatArray[0] = num;

    // Create a Uint32Array that shares the same buffer
    const intArray = new Uint32Array(floatArray.buffer);

    // Convert the 32-bit unsigned integer to a binary string
    const binaryStr = intArray[0].toString(2).padStart(32, "0");

    return binaryStr;
  }

  function binaryMath(num1: number, num2: number, operator: string) {
    let result = 0;
    if (operator == "+") {
      result = num1 + num2;
    } else {
      result = num1 / num2;
    }
    return result;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Title of the app */}
        <h1>Enter a number and convert it into IEEE Standard 754 notiation</h1>

        {/* Layout for input1 and dropdown side by side */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
          {/* Input1 box for user to enter a number */}
          <div>
            <input
              type="text"
              value={input1}
              onChange={handleInput1Change}
              placeholder="Enter number"
            />
            {/* Show error1 message in red if input1 is invalid */}
            {error1 && <p style={{ color: "red" }}>{error1}</p>}
          </div>

          {/* Dropdown for selecting Single or double precision */}
        </div>
        <div>
          {/* Button to trigger conversion */}
          <button
            onClick={() => {
              setResult1(
                `${input1} is ${floatToIEEE754Binary(parseFloat(input1))}`
              );
            }}
          >
            Convert
          </button>

          {/* Display conversion result1 if available */}
          {result1 && <h2 style={{ marginTop: "1rem" }}>{result1}</h2>}
        </div>
        {/* -------------------------------------------------------------------------------------------------------- */}
        <h1>Enter two number and add/divide them</h1>

        {/* Layout for input1 and dropdown side by side */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
          {/* Input1 box for user to enter a number */}
          <div>
            <input
              type="text"
              value={input2}
              onChange={handleInput2Change}
              placeholder="Enter number"
            />
            {/* Show error1 message in red if input1 is invalid */}
            {error2 && <p style={{ color: "red" }}>{error2}</p>}
            <div></div>
            <input
              type="text"
              value={input3}
              onChange={handleInput3Change}
              placeholder="Enter number"
            />
            {/* Show error1 message in red if input1 is invalid */}
            {error3 && <p style={{ color: "red" }}>{error3}</p>}
          </div>

          {/* Dropdown for selecting addition or division */}
          <div>
            <select value={base2} onChange={(e) => setBase2(e.target.value)}>
              <option value="+">Add</option>
              <option value="/">Divide</option>
            </select>
          </div>
        </div>
        <div>
          {/* Button to trigger conversion */}
          <button
            onClick={() => {
              let math = base2;
              if (math == "+") {
                math = "plus ";
              } else {
                math = "divided by ";
              }
              setResult2(
                `${input2} ${math} ${input3} is ${binaryMath(
                  parseFloat(input2),
                  parseFloat(input3),
                  base2
                )}`
              );
            }}
          >
            DO MATH
          </button>

          {/* Display conversion result1 if available */}
          {result2 && <h2 style={{ marginTop: "1rem" }}>{result2}</h2>}
        </div>
        {/* -------------------------------------------------------------------------------------------------------- */}
        <h1>Check the special values</h1>

        {/* Layout for input1 and dropdown side by side */}

        <div>
          {/* Button to trigger conversion */}
          <button
            onClick={() => {
              setResult3(
                `Positive infinity = ${posInf}, ${posInf === Infinity}`
              );
            }}
          >
            Positive Infinity?
          </button>{" "}
          <button
            onClick={() => {
              setResult4(
                `negative infinity = ${negInf}, ${negInf === -Infinity}`
              );
            }}
          >
            Negative Infinity?
          </button>{" "}
          <button
            onClick={() => {
              setResult5(`Not a Number = ${nanVal}, ${isNaN(nanVal)}`);
            }}
          >
            Not a Number?
          </button>
          {result3 && <h2 style={{ marginTop: "1rem" }}>{result3}</h2>}
          {result4 && <h2 style={{ marginTop: "1rem" }}>{result4}</h2>}
          {result5 && <h2 style={{ marginTop: "1rem" }}>{result5}</h2>}
        </div>
        {/* -------------------------------------------------------------------------------------------------------- */}
        <h1>Check the different rounding methods in Javascript using</h1>
        <h1>Math.PI ({Math.PI})</h1>

        {/* Layout for input1 and dropdown side by side */}

        <div>
          {/* Button to trigger conversion */}
          <button
            onClick={() => {
              setResult6(`Math.ceil(Math.PI) = ${Math.ceil(Math.PI)}`);
            }}
          >
            Math.ceil
          </button>{" "}
          <button
            onClick={() => {
              setResult7(`Math.floor(Math.PI) = ${Math.floor(Math.PI)}`);
            }}
          >
            Math.floor
          </button>{" "}
          <button
            onClick={() => {
              setResult8(`Math.(Math.PI) = ${Math.fround(Math.PI)}`);
            }}
          >
            Math.fround
          </button>
          {result6 && (
            <h2 style={{ marginTop: "1rem" }}>
              {result6} -- The Math.ceil() method rounds a number rounded UP to
              the nearest integer.
            </h2>
          )}
          {result7 && (
            <h2 style={{ marginTop: "1rem" }}>
              {result7} -- The Math.floor() method rounds a number DOWN to the
              nearest integer.
            </h2>
          )}
          {result8 && (
            <h2 style={{ marginTop: "1rem" }}>
              {result8} -- The Math.fround() method returns the nearest 32-bit
              single precision float representation of a number.
            </h2>
          )}
        </div>
        {/* -------------------------------------------------------------------------------------------------------- */}
        <h1>Underflow and Overflow</h1>

        {/* Layout for input1 and dropdown side by side */}

        <div>
          {/* Button to trigger conversion */}
          <button
            onClick={() => {
              setResult9(
                `Overflow = 1e308 * 10 = ${overflow}, ${overflow === Infinity}`
              );
            }}
          >
            Overflow
          </button>{" "}
          <button
            onClick={() => {
              setResult10(
                `Underflow = 1e-324 / 10 = ${underflow}, ${underflow === 0}`
              );
            }}
          >
            Negative Infinity?
          </button>
          {result9 && <h2 style={{ marginTop: "1rem" }}>{result9}</h2>}
          {result10 && <h2 style={{ marginTop: "1rem" }}>{result10}</h2>}
        </div>
        {/* -------------------------------------------------------------------------------------------------------- */}
      </main>
      <GoBackButton />
    </div>
  );
}
