import { Link } from "react-router-dom";
import { IDrinkIngredients } from "../interfaces";

interface IListIngredientsProps {
  ingredientList: IDrinkIngredients[];
}

export function ListIngredients({ ingredientList }: IListIngredientsProps) {
  const formatName = (string: string) => {
    return string.toLowerCase().replace(" ", "-");
  };

  return (
    <section className="list-ingredients">
      {ingredientList.map((item, i) => (
        <Link className="list-ingredients__wrapper" key={`${item.ingredient}-${i}`} to={`../ingredient/${formatName(item.ingredient)}`}>
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
