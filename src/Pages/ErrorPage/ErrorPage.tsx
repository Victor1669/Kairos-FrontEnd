import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Erro {error.status}</h1>
        <p>{error.data.message}</p>
        <Link to="/">Retorne para o conteúdo do app</Link>
      </div>
    );
  }

  return <div>Erro desconhecido</div>;
}
