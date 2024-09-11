import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchResultContext";
import { CocktailCard, Pagination } from ".";

const maxResultsPerPage = 10;

export function ListResults() {
  const { searchResults } = useSearchContext();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // If the searchResults change, set page to 1 so the user doesn't have to navigate back
  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults])

  const results = searchResults ? searchResults : [];

  // Get the last and first index to use when slicing results list
  const lastItemIndex = currentPage * maxResultsPerPage;
  const firstItemIndex = lastItemIndex - maxResultsPerPage;

  // Get the current posts to display
  const currentPosts = results.slice(firstItemIndex, lastItemIndex);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section className="list-results">
        {
          currentPosts.map(cocktail => (
            <CocktailCard cocktail={cocktail} key={cocktail.idDrink} />
          ))
        }
      </section>
      <Pagination
        totalPosts={results.length}
        resultsPerPage={maxResultsPerPage}
        handleClick={handleClick}
        currentPage={currentPage}
      />
    </>
  );
}
