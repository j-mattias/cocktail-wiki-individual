import { useFavoriteDrinksContext } from "../contexts";
import { IDrinkReformat } from "../interfaces";

interface IFavoriteButtonProps {
  cocktail: IDrinkReformat;
}

export function FavoriteButton({ cocktail }: IFavoriteButtonProps) {
  // Access the FavoriteDrinksContext
  const { favoriteDrinks, setFavoriteDrinks } = useFavoriteDrinksContext();

  // If the drink is in favorites add the solid class, outline if not
  const computedIsFavorite = favoriteDrinks.some((fd) => fd.idDrink === cocktail.idDrink);
  const computedIconStyle = computedIsFavorite ? "fa-solid" : "fa-regular";

  // Add or remove drink from favorites
  const updateFavoriteDrinks = () => {
    const found = favoriteDrinks.find((fd) => fd.idDrink === cocktail.idDrink);

    // If the drink is not favorited, add it
    if (!found) {
      setFavoriteDrinks((fd) => [...fd, cocktail]);

      // Otherwise if it is favorited, remove it
    } else {
      setFavoriteDrinks((fd) => fd.filter((f) => f.idDrink !== cocktail.idDrink));
    }
  };

  return <i className={`${computedIconStyle} fa-heart`} onClick={updateFavoriteDrinks}></i>;
}
