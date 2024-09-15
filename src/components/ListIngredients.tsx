import { Link } from "react-router-dom";
import { IDrinkIngredients } from "../interfaces";

interface IListIngredientsProps {
  ingredientList: IDrinkIngredients[];
}

export function ListIngredients({ ingredientList }: IListIngredientsProps) {
  return (
    <section className="list-ingredients">
      {ingredientList.map((item) => (
        <Link className="ingredient-wrapper" key={item.ingredient} to={`../ingredient/${item.ingredient}`}>
          <figure>
            <img src={item.thumbnail || ""} alt={`Image of ${item.ingredient}`} />
            <figcaption>
              {item.measure} {item.ingredient}
            </figcaption>
          </figure>
        </Link>
      ))}
    </section>
  );
}
