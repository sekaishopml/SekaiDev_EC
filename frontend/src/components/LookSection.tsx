"use client";

import styles from "./LookSection.module.css";

export default function LookSection() {
  return (
    <section className={styles.lookSection} id="look">
      <div className={styles.lookRow}>
        <h2 className={styles.ghostText}>BUILD</h2>
        <div className={styles.mediaBox} data-placeholder="cytaxi-preview" />
      </div>

      <div className={`${styles.lookRow} ${styles.lookRowOffset}`}>
        <div
          className={`${styles.mediaBox} ${styles.mediaBoxWide}`}
          data-placeholder="stack-overview"
        />
        <h2 className={styles.ghostText}>SHIP</h2>
      </div>

      <p className={styles.lookSubtitle}>Software Studio</p>
      <h2 className={styles.lookHeadline}>DIGITAL PRODUCTS.</h2>
    </section>
  );
}
