import { ListTags } from ".";
import { IDrinkReformat } from "../interfaces";

interface ICocktailInfoProps {
  cocktail: IDrinkReformat;
}

export function CocktailInfo({cocktail}: ICocktailInfoProps) {
  const computedTags = cocktail.strTags ? cocktail.strTags.split(",") : [];

  return (
    <aside className="cocktail-info">
      <figure>
        <img src={cocktail.strDrinkThumb} alt={`Image of a ${cocktail.strDrink}`} />
      </figure>
      <ListTags tags={computedTags} />
    </aside>
  );
}
