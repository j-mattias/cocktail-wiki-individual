import { Params } from "react-router-dom";
import { reformatData } from "./helpers";

type TParams = Params<string>;
interface IParams {
  params: TParams;
}

// Get a random cocktail when loading the homepage
export async function randomCocktailLoader() {
  try {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");

    if (!response.ok) {
      throw new Error("Failed to fetch cocktail");
    }

    // Convert to json and reformat the data before returning it
    return reformatData(await response.json());
  } catch (error: any) {
    throw new Error("Something went wrong", error.message);
  }
}

// Get the cocktail by id, by accessing it through the route params
export async function cocktailInfoLoader({ params }: IParams) {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + params.id
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cocktail");
    }

    // Store the reformatted data and destructure the cocktail to add thumbnails for ingredients
    const reformattedData = reformatData(await response.json());
    const [cocktail] = reformattedData;

    // Wait for all of the thumbnails to be fetched before returning the data
    await Promise.all(
      cocktail.strIngredients.map(async (item) => {
        item.thumbnail = await getIngredientThumb(item.ingredient);
      })
    );

    return reformattedData;
  } catch (error: any) {
    throw new Error("Something went wrong", error.message);
  }
}

// Get thumbnail for a cocktail ingredient
async function getIngredientThumb(ingredient: string) {
  try {
    const formatName = ingredient.trim().toLowerCase();
    const url = `https://www.thecocktaildb.com/images/ingredients/${formatName}.png`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch thumbnail");
    }

    // Return the response url, this endpoint doesn't respond with JSON
    return response.url;
  } catch (error: any) {
    throw new Error("Something went wrong", error.message);
  }
}

// Get information about a specific ingredient
export async function getIngredientInfo({ params }: IParams) {
  try {
    // Format the ingredient string and get drinks that use the ingredient
    let formatName = params.name ? params.name.replace("-", "+") : "";
    const { drinks } = await getDrinksWithIngredient(formatName);

    // Get ingredient information
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${formatName}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch ingredient info");
    }

    // Convert data to json and destructure ingredient info object
    const data = await response.json();
    const [ingredient] = data.ingredients;

    // Format the ingredient name to get the thumbnail and add it to the ingredient object
    formatName = formatName.replace("+", " ");
    const thumbnail = await getIngredientThumb(formatName);
    ingredient.thumbnail = thumbnail;

    return {ingredient, drinks};
  } catch (error: any) {
    throw new Error("Something went wrong", error.message);
  }
}

// Get drinks that use the ingredient being requested
async function getDrinksWithIngredient(ingredient: string) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch drinks containing ${ingredient}`);
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error("Something went wrong", error.message);
  }
}
