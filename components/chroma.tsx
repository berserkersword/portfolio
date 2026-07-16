import styles from "./chroma.module.css";

interface Props {
  children: string;
  className?: string;
}

export function Chroma({ children }: Props) {
  return (
    <span
      className={`${styles.chroma}`}
      data-text={children}
    >
      {children}
    </span>
  );
}
