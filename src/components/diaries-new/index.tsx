"use client";

import styles from "./styles.module.css";

export default function DiariesNew() {
  return (
    <div className={styles.wrapper}>
      {/* Header: full * 24 */}
      <div className={styles.header}>Header Area</div>

      {/* Gap: full * 40 */}
      <div className={styles.gap40} />

      {/* Emotion Box: full * 64 */}
      <div className={styles.emotionBox}>Emotion Box Area</div>

      {/* Gap: full * 40 */}
      <div className={styles.gap40} />

      {/* Input Title: full * 76 */}
      <div className={styles.inputTitle}>Input Title Area</div>

      {/* Gap: full * 24 */}
      <div className={styles.gap24} />

      {/* Input Content: full * 156 */}
      <div className={styles.inputContent}>Input Content Area</div>

      {/* Gap: full * 40 */}
      <div className={styles.gap40} />

      {/* Footer: full * 48 */}
      <div className={styles.footer}>Footer Area</div>
    </div>
  );
}
