import { useLoaderData } from "react-router-dom";
import { IDrinkReformat } from "../interfaces";
import { CocktailCard, RandomizeButton } from "../components";

export function HomePage() {
  const randomCocktailData = useLoaderData() as IDrinkReformat[];
  const randomCocktail = randomCocktailData[0];

  return (
    <>
      <h1>Random Cocktail</h1>
      <CocktailCard cocktail={randomCocktail} />
      <RandomizeButton />
    </>
  );
}
