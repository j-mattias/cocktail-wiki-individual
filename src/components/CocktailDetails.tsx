import { useLoaderData } from "react-router-dom"
import { IDrinkReformat } from "../interfaces";

export function CocktailDetails() {
  const [ cocktail ] = useLoaderData() as IDrinkReformat[];
  console.log("cocktail", cocktail);

  const computedTags = cocktail.strTags ? cocktail.strTags.split(",") : [];

  return (
    <article className="cocktail-details">
      <div className="cocktail-img-wrapper">
        <figure>
          <img src={cocktail.strDrinkThumb} alt={`Image of a ${cocktail.strDrink}`} />
        </figure>
        <div className="cocktail-tags">
          {computedTags.map((tag) => (
            <p className="cocktail-tag">{tag}</p>
          ))}
        </div>
      </div>
      <div className="cocktail-info">
        <h2>
          {cocktail.strDrink} ({cocktail.strCategory})
        </h2>
        {cocktail.strCategory}
        <h3>Ingredients</h3>
        {cocktail.strIngredients.map((item) => (
          <p>
            {item.measure} {item.ingredient}
          </p>
        ))}
        <h3>Glass</h3>
        <p>{cocktail.strGlass}</p>
        <h3>Instructions</h3>
        <p>{cocktail.strInstructions}</p>
      </div>
    </article>
  );
}
