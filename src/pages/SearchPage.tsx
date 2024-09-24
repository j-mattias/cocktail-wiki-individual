import { ListResults, Search } from "../components";
import { useSearchContext } from "../contexts";

export function SearchPage() {
  const { searchResults } = useSearchContext();

  return (
    <section className="search-page flex-col">
      <h1>Search Cocktail</h1>
      <Search />
      <ListResults listItems={searchResults} />
    </section>
  );
}
