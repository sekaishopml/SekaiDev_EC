"use client";

import styles from "./LookSection.module.css";

export default function LookSection() {
  return (
    <section className={styles.lookSection} id="look">
      <div className={styles.rowTop}>
        <div className={styles.textBlock}>
          <h2 className={styles.ghostText}>LOOK</h2>
          <p className={styles.subLabel}>BEYOND LIMITS.</p>
        </div>
        <div className={styles.mediaBox} data-placeholder="cytaxi-preview" />
      </div>

      <div className={styles.rowMiddle}>
        <div
          className={`${styles.mediaBox} ${styles.mediaBoxWide}`}
          data-placeholder="stack-overview"
        />
        <h2 className={styles.ghostText}>FIND</h2>
      </div>

      <div className={styles.bottom}>
        <p className={styles.subLabel}>Software Studio</p>
        <h2 className={styles.headline}>TRUE PERFECTION.</h2>
      </div>
    </section>
  );
}
