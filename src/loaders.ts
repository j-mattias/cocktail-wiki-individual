import { Params } from "react-router-dom";
import { reformatData } from "./helpers";

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
export async function cocktailInfoLoader({ params }: { params: Params<string> }) {
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
    throw new Error("Something went wrong", error.message)
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
    throw new Error("Something went wrong", error.message)
  }
};
