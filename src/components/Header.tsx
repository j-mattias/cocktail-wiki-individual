import { ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";

export function Header(): ReactElement {
  return (
    <header className="header">
      <nav className="navbar">
        <Link className="navbar__link navbar__link--title" to="/">
          Cocktail Wiki
        </Link>
        <NavLink className="navbar__link" to="/">
          Home
        </NavLink>
        <NavLink className="navbar__link" to="search">
          Search
        </NavLink>
        <NavLink className="navbar__link" to="favorites">
          Favorites
        </NavLink>
      </nav>
    </header>
  );
}
