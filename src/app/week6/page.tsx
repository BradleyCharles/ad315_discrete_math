"use client";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Title of the app */}
        <h2>Select assignment you want to view</h2>
        {/* Layout for input and dropdown side by side */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
          <div>
            <Link href="/week6/page1">
              <button>Simulate Probability Experiments</button>
            </Link>
          </div>
          <div>
            <Link href="/week6/page2">
              <button>Probability Calculator for N-sided Dice</button>
            </Link>
          </div>
          </div>
      </main>

      {/* Optional footer section */}
      <footer className={styles.footer}></footer>
    </div>
  );
}
