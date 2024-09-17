import { IIngredient } from "../interfaces";

interface IIngredientInfoProps {
  ingredient: IIngredient;
}

export function IngredientInfo({ ingredient }: IIngredientInfoProps) {
  return (
    <aside className="ingredient-info">
      <figure>
        <img src={ingredient.thumbnail} alt={`Image of ${ingredient.strIngredient}`} />
      </figure>
      <div className="ingredient-info__container">
        <div className="ingredient-info__wrapper">
          <h4>Alcoholic:</h4>
          <p>{ingredient.strAlcohol}</p>
        </div>
        {ingredient.strType && (
          <div className="ingredient-info__wrapper">
            <h4>Type:</h4>
            <p>{ingredient.strType}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
