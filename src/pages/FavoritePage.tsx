import { ListResults } from "../components";
import { useFavoriteDrinksContext } from "../contexts"

export function FavoritePage() {
  const { favoriteDrinks } = useFavoriteDrinksContext();

  return (
    <>
      <h1>Favorite Drinks</h1>
      <ListResults listItems={favoriteDrinks} />
    </>
  )
}
