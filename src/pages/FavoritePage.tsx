import { ListResults } from "../components";
import { useFavoriteDrinksContext } from "../contexts"

export function FavoritePage() {
  const { favoriteDrinks } = useFavoriteDrinksContext();

  return (
    <section className="favorite-page flex-col">
      <h1>Favorite Cocktails</h1>
      {favoriteDrinks.length === 0 && <h3>No favorites saved yet.</h3>}
      <ListResults listItems={favoriteDrinks} />
    </section>
  )
}
