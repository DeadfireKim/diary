import styles from "./styles.module.css";

export default function Diaries() {
  return (
    <div className={styles.container}>
      {/* Gap: 1168 * 32 */}
      <div className={styles.gap32} />

      {/* Search section: 1168 * 48 */}
      <div className={styles.search}>Search Area</div>

      {/* Gap: 1168 * 42 */}
      <div className={styles.gap42} />

      {/* Main section: 1168 * 936 */}
      <div className={styles.main}>Main Content Area</div>

      {/* Gap: 1168 * 40 */}
      <div className={styles.gap40} />

      {/* Pagination section: 1168 * 32 */}
      <div className={styles.pagination}>Pagination Area</div>

      {/* Gap: 1168 * 40 */}
      <div className={styles.gap40} />
    </div>
  );
}
