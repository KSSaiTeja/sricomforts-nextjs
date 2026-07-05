import styles from "./separator-notch.module.css";

export function SeparatorNotch() {
  return (
    <div className={styles.separator} aria-hidden>
      <div className={styles.notch}>
        <div className={styles.bg} />
      </div>
    </div>
  );
}
