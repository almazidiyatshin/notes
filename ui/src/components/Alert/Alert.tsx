type TProps = { color: "success" | "error"; children: React.ReactNode };

import styles from "./styles.module.scss";

export const Alert = ({ color, children }: TProps) => <div className={styles[color]}>{children}</div>;
