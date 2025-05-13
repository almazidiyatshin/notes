import styles from "./styles.module.scss";

export type TAlertProps = { color: "success" | "info" | "error"; hidden?: boolean; children: React.ReactNode };

export const Alert = ({ color, hidden, children }: TAlertProps) => {
  if (hidden) {
    return null;
  }

  return <div className={styles[color]}>{children}</div>;
};
