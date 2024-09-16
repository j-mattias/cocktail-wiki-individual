import { useLoaderData } from "react-router-dom"
import { IDrinkWithIngredient, IIngredient } from "../interfaces";
import { InfiniteScroll, IngredientInfo } from "../components";

interface ILoaderData {
  ingredient: IIngredient;
  drinks: IDrinkWithIngredient[];
}

const ResultCount = 4;

export function IngredientPage() {
  const {ingredient, drinks} = useLoaderData() as ILoaderData;

  console.log(ingredient, drinks);
  return (
    <>
      <h1>{ingredient.strIngredient}</h1>
      <IngredientInfo ingredient={ingredient} />
      <InfiniteScroll listItems={drinks} resultCount={ResultCount} />
    </>
  )
}
