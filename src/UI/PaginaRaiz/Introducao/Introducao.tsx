import Styles from "./Introducao.module.css";

export default function Introducao() {
  return (
    <>
      <div className={Styles.Introducao + " elemento-com-imagem"} />
      <div className={Styles.ImagemCamisa + " elemento-com-imagem"} />
    </>
  );
}
