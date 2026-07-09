import Styles from "./Miniatura.module.css";

export default function Miniatura({
  src,
  label,
  onClick,
}: {
  src?: string;
  label?: string;
  onClick?(): void;
}) {
  return (
    <div className={Styles.Miniatura} onClick={() => onClick?.()}>
      {src ? <img src={src} /> : <span>{label}</span>}
    </div>
  );
}
