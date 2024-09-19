import { CocktailCard, Pagination } from ".";
import { TDrinkArray } from "../interfaces";
import { useSearchParams } from "react-router-dom";

type TListItems = TDrinkArray | null;

interface IListResultsProps {
  listItems: TListItems;
}

const maxResultsPerPage = 10;

export function ListResults({ listItems }: IListResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current page number or set it to 1
  const currentPage = Number(searchParams.get("page")) || 1;

  const results = listItems ? listItems : [];
  const resultsLen = results.length;

  // Calculate the amount of pages needed to display all results
  const numPages = Math.ceil(resultsLen / maxResultsPerPage);
  
  // Get the last and first index to use when slicing results list
  const lastItemIndex = currentPage * maxResultsPerPage;
  const firstItemIndex = lastItemIndex - maxResultsPerPage;
  
  // Get the current posts to display
  const currentPosts = results.slice(firstItemIndex, lastItemIndex);

  // Update the page number in searchParams when clicking pagination button
  const handleClick = (page: string) => {
    setSearchParams(s => {
      s.set("page", page)
      return s;
    })
  };

  return (
    <>
      {currentPage > numPages && resultsLen > 0 && <p>{`Not enough results for page ${currentPage}`}</p>}
      <section className="list-results">
        {currentPosts.map((cocktail) => (
          <CocktailCard cocktail={cocktail} key={cocktail.idDrink} />
        ))}
      </section>
      <Pagination
        numPages={numPages}
        handleClick={handleClick}
        currentPage={currentPage}
      />
    </>
  );
}
