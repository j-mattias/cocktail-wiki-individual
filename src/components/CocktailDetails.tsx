import { useLoaderData } from "react-router-dom";
import { IDrinkReformat } from "../interfaces";
import { FavoriteButton } from "./FavoriteButton";
import { ListIngredients, ListTags } from ".";

export function CocktailDetails() {
  const [cocktail] = useLoaderData() as IDrinkReformat[];
  console.log("cocktail", cocktail);

  const computedTags = cocktail.strTags ? cocktail.strTags.split(",") : [];

  return (
    <article className="cocktail-details">
      <div className="cocktail-img-wrapper">
        <figure>
          <img src={cocktail.strDrinkThumb} alt={`Image of a ${cocktail.strDrink}`} />
        </figure>
        <ListTags tags={computedTags} />
      </div>
      <div className="cocktail-info">
        <FavoriteButton cocktail={cocktail} />
        <h2>
          {cocktail.strDrink} ({cocktail.strCategory})
        </h2>
        <h3>Ingredients</h3>
        <ListIngredients ingredientList={cocktail.strIngredients} />
        <h3>Glass</h3>
        <p>{cocktail.strGlass}</p>
        <h3>Instructions</h3>
        <p>{cocktail.strInstructions}</p>
      </div>
    </article>
  );
}
