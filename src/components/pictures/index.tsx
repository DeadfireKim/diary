import styles from "./styles.module.css";

export default function Pictures() {
  return (
    <div className={styles.container}>
      {/* Gap: 1168 x 32 */}
      <div className={styles.gap32} />

      {/* Filter: 1168 x 48 */}
      <div className={styles.filter} />

      {/* Gap: 1168 x 42 */}
      <div className={styles.gap42} />

      {/* Main: 1168 x auto */}
      <div className={styles.main} />
    </div>
  );
}
