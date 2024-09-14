import { ListResults } from "../components";
import { useFavoriteDrinksContext } from "../contexts"

export function FavoritePage() {
  const { favoriteDrinks } = useFavoriteDrinksContext();

  return (
    <>
      <h1>Favorite Drinks</h1>
      {favoriteDrinks.length === 0 && <h3>No favorites saved yet.</h3>}
      <ListResults listItems={favoriteDrinks} />
    </>
  )
}
