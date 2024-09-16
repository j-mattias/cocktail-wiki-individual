import { IIngredient } from "../interfaces"

interface IIngredientInfoProps {
  ingredient: IIngredient;
}

export function IngredientInfo({ingredient}: IIngredientInfoProps) {

  return (
    <>
      <section className="ingredient-info">
        <figure>
          <img src={ingredient.thumbnail} alt={`Image of ${ingredient.strIngredient}`} />
        </figure>
        {ingredient.strType && <p>Type: {ingredient.strType}</p>}
        <p>Alcoholic: {ingredient.strAlcohol}</p>
      </section>
      <section className="description">
        <h2>Description</h2>
        {ingredient.strDescription && <p>{ingredient.strDescription}</p>}
      </section>
    </>
  );
}
