import { Link, useRouteError } from "react-router-dom"

export function CocktailErrorPage() {
  const error = useRouteError() as Error;

  return (
    <section className="error-page">
      <h1>{error.message}</h1>
      <Link className="go-home" to="/">
        Go Home
      </Link>
    </section>
  );
}
