import { useLoaderData } from "react-router-dom";
import { IDrinkReformat } from "../interfaces";
import { CocktailCard, RandomizeButton } from "../components";

export function HomePage() {
  const [randomCocktail] = useLoaderData() as IDrinkReformat[];

  return (
    <section className="home-page flex-col">
      <h1>Random Cocktail</h1>
      <CocktailCard cocktail={randomCocktail} />
      <RandomizeButton />
    </section>
  );
}
