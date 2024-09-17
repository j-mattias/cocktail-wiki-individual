import { IIngredient } from "../interfaces";

interface IIngredientDescriptionProps {
  ingredient: IIngredient;
}

export default function IngredientDescription({ ingredient }: IIngredientDescriptionProps) {
  return (
    <article className="ingredient-description">
      <h2>Description</h2>
      <p>{ingredient.strDescription}</p>
    </article>
  );
}
