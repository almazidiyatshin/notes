import styles from "./styles.module.scss";

type TProps = {
  title: React.ReactNode;
  description?: string;
  size: 1 | 2;
  children?: React.ReactNode;
};

export const Segment = ({ title, description, size, children }: TProps) => (
  <div className={styles.segment}>
    {size === 1 ? <h1 className={styles.title}>{title}</h1> : <h2 className={styles.title}>{title}</h2>}
    {description && <p className={styles.description}>{description}</p>}
    {children && <div className={styles.content}>{children}</div>}
  </div>
);
