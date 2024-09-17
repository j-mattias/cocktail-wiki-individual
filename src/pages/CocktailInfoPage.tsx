import { useLoaderData } from "react-router-dom";
import { CocktailDetails, CocktailInfo, FavoriteButton } from "../components";
import { IDrinkReformat } from "../interfaces";

export function CocktailInfoPage() {
  const [cocktail] = useLoaderData() as IDrinkReformat[];

  return (
    <section className="cocktail-info-page">
      <div className="cocktail-title-wrapper">
        <h1>{cocktail.strDrink}</h1>
        <FavoriteButton cocktail={cocktail} />
      </div>
      <div className="cocktail-info-wrapper">
        <CocktailInfo cocktail={cocktail} />
        <CocktailDetails cocktail={cocktail} />
      </div>
    </section>
  );
}
