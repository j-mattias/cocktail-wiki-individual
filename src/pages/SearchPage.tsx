import { ListResults, Search } from "../components";
import { SearchContextProvider } from "../contexts";

export function SearchPage() {
  return (
    <section className="search-page">
      <h1>Search Cocktail</h1>
      <SearchContextProvider>
        <Search />
        <ListResults />
      </SearchContextProvider>
    </section>
  );
}
