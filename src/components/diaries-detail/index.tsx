"use client";

import styles from "./styles.module.css";

export default function DiariesDetail() {
  return (
    <div className={styles.container}>
      {/* Gap: 1168 * 64 */}
      <div className={styles.gap64} />

      {/* Detail Title section: 1168 * 84 */}
      <div className={styles.detailTitle}>Detail Title Area</div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24} />

      {/* Detail Content section: 1168 * 169 */}
      <div className={styles.detailContent}>Detail Content Area</div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24} />

      {/* Detail Footer section: 1168 * 56 */}
      <div className={styles.detailFooter}>Detail Footer Area</div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24} />

      {/* Retrospect Input section: 1168 * 85 */}
      <div className={styles.retrospectInput}>Retrospect Input Area</div>

      {/* Gap: 1168 * 16 */}
      <div className={styles.gap16} />

      {/* Retrospect List section: 1168 * 72 */}
      <div className={styles.retrospectList}>Retrospect List Area</div>
    </div>
  );
}
