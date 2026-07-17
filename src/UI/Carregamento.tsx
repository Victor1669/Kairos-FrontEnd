import { Spinner } from "react-bootstrap";

export default function Carregamento() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "60vh",
        scale: 2,
        gap: 15,
      }}
    >
      <Spinner variant="dark" />
      <p>Carregando...</p>
    </div>
  );
}
