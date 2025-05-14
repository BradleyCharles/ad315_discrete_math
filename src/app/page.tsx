"use client";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Title of the app */}
        <h1>AD315 Discrete Math</h1>
        <h2>Select a week to view the assignment</h2>
        {/* Layout for input and dropdown side by side */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
          <div>
            <Link href="/week1">
              <button>Go to Week 1</button>
            </Link>
          </div>
          <div>
            <Link href="/week2">
              <button>Go to Week 2</button>
            </Link>
          </div>
          <div>
            <Link href="/week3">
              <button>Go to Week 3</button>
            </Link>
          </div>
          <div>
            <Link href="/week4">
              <button>Go to Week 4</button>
            </Link>
          </div>
          <div>
            <Link href="/week5">
              <button>Go to Week 5</button>
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
          <div>
            <Link href="/week6">
              <button>Go to Week 6</button>
            </Link>
          </div>
          <div>
            <Link href="/week7">
              <button>Go to Week 7</button>
            </Link>
          </div>
          <div>
            <Link href="/week8">
              <button>Go to Week 8</button>
            </Link>
          </div>
          <div>
            <Link href="/week9">
              <button>Go to Week 9</button>
            </Link>
          </div>
          <div>
            <Link href="/week10">
              <button>Go to Week 10</button>
            </Link>
          </div>
        </div>
      </main>

      {/* Optional footer section */}
      <footer className={styles.footer}></footer>
    </div>
  );
}
