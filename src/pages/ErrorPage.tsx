import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <section className="error-page">
      <h1>404: Could not find that page</h1>
      <Link className="go-home" to="/">
        Go Home
      </Link>
    </section>
  );
}
