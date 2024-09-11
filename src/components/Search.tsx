import { useState } from "react";
import { reformatData } from "../helpers";
import { useSearchContext } from "../contexts";

export function Search() {
  const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setSearchResults } = useSearchContext();

  const fetchCocktail: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const response = await fetch(BASE_URL + input);

    // Display error if data could not be fetched
    if (!response.ok) {
      setError("Could not fetch cocktail data");
      return;
    }

    const data = await response.json();

    // Display error if drink was not found
    if (!data.drinks) {
      setError(`Could not find drink ${input}`);
      return;
    }

    // Reformat the data with a helper function and update the searchResult context
    const reformattedData = reformatData(data);
    setSearchResults(reformattedData);

    // If there was no error clear the error message
    setError("");
  };

  return (
    <>
      <form className="search-form" onSubmit={fetchCocktail}>
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
