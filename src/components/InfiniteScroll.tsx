import { useEffect, useRef, useState } from "react";
import { IDrinkWithIngredient } from "../interfaces";
import { CocktailCard } from "./CocktailCard";

interface IInfiniteScrollProps {
  listItems: IDrinkWithIngredient[];
  resultCount: number;
}

export function InfiniteScroll({ listItems, resultCount }: IInfiniteScrollProps) {
  const [resultCutoff, setResultCutoff] = useState<number>(resultCount);

  // Track amount of items to be shown
  const items = listItems.slice(0, resultCutoff);
  const totalResultsRef = useRef<number>(resultCount);

  // Load more items when scroll hits bottom
  const loadItems = () => {
    // Store the windows current height, and the total height of the document
    const currentHeight = window.innerHeight + window.scrollY;
    const offsetHeight = document.body.offsetHeight;

    // Update the amount of results to show when scroll hits bottom
    if (currentHeight >= offsetHeight && !(totalResultsRef.current >= listItems.length)) {
      setResultCutoff((r) => r + resultCount);

      totalResultsRef.current += resultCount;
    }
  }

  // Add an event listener to load items when scroll hits bottom, remove it on unmount
  useEffect(() => {
    window.addEventListener("scroll", loadItems);

    return () => window.removeEventListener("scroll", loadItems);
  }, []);

  return (
    <section className="infinite-scroll">
      <h2>Ingredient In</h2>
      {items.map((item) => (
        <CocktailCard cocktail={item} key={item.idDrink} />
      ))}
    </section>
  );
}
