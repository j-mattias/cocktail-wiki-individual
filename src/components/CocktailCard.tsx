import { Link } from "react-router-dom";
import { IDrinkReformat } from "../interfaces"

interface ICocktailCardProps {
  cocktail: IDrinkReformat;
}

export function CocktailCard({ cocktail }: ICocktailCardProps) {
  return (
    <article className="cocktail-card">
      <figure className="coktail-card__figure">
        <img src={cocktail.strDrinkThumb} alt={`Image of ${cocktail.strDrink}`} className="cocktail-card__img" />
      </figure>
      <h3 className="cocktail-card__title">{cocktail.strDrink}</h3>
      <Link to={cocktail.idDrink}>See more</Link>
    </article>
  )
}
