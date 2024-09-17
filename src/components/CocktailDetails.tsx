import { IDrinkReformat } from "../interfaces";
import { ListIngredients } from ".";

interface ICocktailDetailsProps {
  cocktail: IDrinkReformat;
}

export function CocktailDetails({ cocktail }: ICocktailDetailsProps) {
  console.log("cocktail", cocktail);

  return (
    <article className="cocktail-details">
      <h3>Ingredients</h3>
      <ListIngredients ingredientList={cocktail.strIngredients} />
      <h3>Glass</h3>
      <p>{cocktail.strGlass}</p>
      <h3>Instructions</h3>
      <p>{cocktail.strInstructions}</p>
      <h3>Category</h3>
      <p className="cocktail-details__category">{cocktail.strCategory}</p>
    </article>
  );
}
