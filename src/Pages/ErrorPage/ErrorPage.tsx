import { Button } from "react-bootstrap";
import {
  isRouteErrorResponse,
  Link,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigateTo = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h1>Erro {error.status}</h1>
        <p>{error.data.message}</p>
        <Link to="/">Retorne para o conteúdo do app</Link>
        <Button onClick={() => navigateTo(-1)}>Retornar</Button>
      </div>
    );
  }

  return <div>Erro desconhecido</div>;
}
