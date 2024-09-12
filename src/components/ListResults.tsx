import { useEffect, useState } from "react";
import { CocktailCard, Pagination } from ".";
import { TDrinkArray } from "../interfaces";

type TListItems = TDrinkArray | null;

interface IListResultsProps {
  listItems: TListItems;
}

const maxResultsPerPage = 10;

export function ListResults({ listItems }: IListResultsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // If the listItems change, set page to 1 so the user doesn't have to navigate back
  useEffect(() => {
    setCurrentPage(1);
  }, [listItems])

  const results = listItems ? listItems : [];

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
