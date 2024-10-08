import { Link } from "react-router-dom";
import { TCocktail } from "../interfaces"
import { FavoriteButton } from "./FavoriteButton";

interface ICocktailCardProps {
  cocktail: TCocktail;
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
        <FavoriteButton cocktail={cocktail} />
      </figure>
      <div className="cocktail-card__details">
        <h3 className="cocktail-card__title">{cocktail.strDrink}</h3>
        <Link className="cocktail-card__link" to={`../cocktail-info/${cocktail.idDrink}`}>
          See more
        </Link>
      </div>
    </article>
  );
}
