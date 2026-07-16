import { Spinner } from "react-bootstrap";

export default function Carregamento() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        scale: 2,
        gap: 15,
      }}
    >
      <Spinner variant="dark" />
      <p>Carregando...</p>
    </div>
  );
}
