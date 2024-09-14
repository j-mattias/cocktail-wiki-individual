import { Link } from "react-router-dom";
import { IDrinkReformat } from "../interfaces"
import { FavoriteButton } from "./FavoriteButton";

interface ICocktailCardProps {
  cocktail: IDrinkReformat;
}

export function CocktailCard({ cocktail }: ICocktailCardProps) {
  return (
    <article className="cocktail-card">
      <figure className="cocktail-card__figure">
        <img
          src={cocktail.strDrinkThumb}
          alt={`Image of ${cocktail.strDrink}`}
          className="cocktail-card__img"
        />
      </figure>
      <div className="cocktail-card__details">
        <h3 className="cocktail-card__title">{cocktail.strDrink}</h3>
        <FavoriteButton cocktail={cocktail} />
        <Link className="cocktail-card__link" to={`../cocktail-info/${cocktail.idDrink}`}>
          See more
        </Link>
      </div>
    </article>
  );
}
