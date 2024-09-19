import { useEffect, useState } from "react";
import { fetchData, reformatData } from "../helpers";
import { useSearchContext } from "../contexts";
import { useSearchParams } from "react-router-dom";

export function Search() {
  const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setSearchResults } = useSearchContext();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Get search params
    const q = searchParams.get("q");
    const page = searchParams.get("page") || "1";

    // If a query was in the url fetch the results
    if (q) {
      const search = async () => {
        try {
          // Fetch and reformat data
          const results = await fetchData(BASE_URL + q, `Failed to fetch ${q}`);

          if (!results.drinks) {
            setError(`Could not find drink "${q}"`);
            setSearchResults(null);
            return;
          }

          const reformattedResults = reformatData(results);

          setSearchResults(reformattedResults);

          setSearchParams({ q, page });
          setError("");
        } catch (error: any) {
          setError(error.message);
        }
      };
      search();
    }

    // Clear out search results when component unmounts
    return () => setSearchResults(null);
  }, [])

  const fetchCocktails: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const results = await fetchData(BASE_URL + input, `Failed to fetch ${input}`);

      // Display error if drink was not found
      if (!results.drinks) {
        setError(`Could not find drink "${input}"`);
        setSearchResults(null);
        return;
      }

      // Reformat and store search results
      const reformattedResults = reformatData(results);
      setSearchResults(reformattedResults);

      // Set the search params and reset error
      setSearchParams({ q: input, page: "1" });
      setError("");
      
    } catch(error: any) {
      setSearchResults(null);
      setError(error.message);
    }
  };

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