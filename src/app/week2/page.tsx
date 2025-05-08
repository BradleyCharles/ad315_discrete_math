"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Title of the app */}
        <h1>Nothing to see here!</h1>
        <div>
          <Link href="/">
            <button>Go back</button>
          </Link>
        </div>
      </main>

      {/* Optional footer section */}
      <footer className={styles.footer}></footer>
    </div>
  );
}
