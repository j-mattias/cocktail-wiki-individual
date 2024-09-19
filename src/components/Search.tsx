import { useEffect, useState } from "react";
import { fetchData, reformatData } from "../helpers";
import { useSearchContext } from "../contexts";
import { useSearchParams } from "react-router-dom";

export function Search() {
  const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  const errorMessage = "Failed to fetch cocktails";

  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setSearchResults } = useSearchContext();

  const [searchParams, setSearchParams] = useSearchParams();

  // Handles fetching search results, updating params and catching errors
  const fetchResults = async (input: string, notOkMsg: string, page = "1") => {
    try {
      const url = BASE_URL + input;
      const results = await fetchData(url, notOkMsg);

      // If no drinks were found display a message
      if (!results.drinks) {
        setError(`Could not find drink "${input}"`);
        setSearchResults(null);
        setSearchParams({ q: input, page });
        return;
      }

      // Reformat the results if drinks were found
      const reformattedResults = reformatData(results);
      setSearchResults(reformattedResults);

      // Update the search parameters in the url
      setSearchParams({ q: input, page });
      
      setError("");
    } catch (error: any) {
      setSearchResults(null);
      setError(error.message);
    }
  };

  // Fetch cocktails when form is submitted
  const fetchCocktails: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetchResults(input, errorMessage);
  };

  useEffect(() => {
    // Get search params
    const q = searchParams.get("q");
    const page = searchParams.get("page") || "1";

    // If a query was in the url fetch the results
    if (q) {
      const loadResults = async () => {
        await fetchResults(q, errorMessage, page);
      };
      loadResults();
    }

    // Clear out search results when component unmounts
    return () => setSearchResults(null);
  }, []);

  return (
    <>
      <form className="search-form" onSubmit={fetchCocktails}>
        <input
          autoFocus
          name="search"
          placeholder="Cocktail"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {error && <h3 className="error">{error}</h3>}
    </>
  );
}
