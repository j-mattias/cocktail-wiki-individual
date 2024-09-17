import { useLoaderData } from "react-router-dom";
import { IDrinkWithIngredient, IIngredient } from "../interfaces";
import { InfiniteScroll, IngredientInfo } from "../components";
import IngredientDescription from "../components/IngredientDescription";

interface ILoaderData {
  ingredient: IIngredient;
  drinks: IDrinkWithIngredient[];
}

const ResultCount = 6;

export function IngredientPage() {
  const { ingredient, drinks } = useLoaderData() as ILoaderData;

  console.log(ingredient, drinks);
  return (
    <section className="ingredient-page">
      <h1>{ingredient.strIngredient}</h1>
      <div className="ingredient-wrapper">
        <IngredientInfo ingredient={ingredient} />
        {ingredient.strDescription && <IngredientDescription ingredient={ingredient} />}
        <InfiniteScroll listItems={drinks} resultCount={ResultCount} />
      </div>
    </section>
  );
}
