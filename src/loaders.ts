import { Params } from "react-router-dom";
import { fetchData, reformatData } from "./helpers";

type TParams = Params<string>;

interface IParams {
  params: TParams;
}

// Get a random cocktail when loading the homepage
export async function randomCocktailLoader() {
  try {
    const randomCocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    const randomCocktailData = await fetchData(
      randomCocktailUrl,
      `Failed to fetch random cocktail`
    );

    // Convert to json and reformat the data before returning it
    return reformatData(randomCocktailData);
  } catch (error: any) {
    throw new Error("Something went wrong", error.message);
  }
}

// Get the cocktail by id, by accessing it through the route params
export async function cocktailInfoLoader({ params }: IParams) {
  try {
    const cocktailInfoUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const cocktailInfoData = await fetchData(cocktailInfoUrl, `Failed to fetch cocktail info`);

    // Store the reformatted data and destructure the cocktail to add thumbnails for ingredients
    const reformattedData = reformatData(cocktailInfoData);
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
    const drinksWithIngredientUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${formatName}`;

    // Get list of drirnks made with the ingredient
    const { drinks } = await fetchData(
      drinksWithIngredientUrl,
      `Failed to fetch drinks containing ${formatName}`
    );

    // Get ingredient information
    const ingredientInfoUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${formatName}`;
    const ingredientData = await fetchData(ingredientInfoUrl, `Failed to fetch ${formatName} info`);

    // Destructure ingredient info object out of array
    const [ingredient] = ingredientData.ingredients;

    // Format the ingredient name to get the thumbnail and add it to the ingredient object
    formatName = formatName.replace("+", " ");
    const thumbnail = await getIngredientThumb(formatName);
    ingredient.thumbnail = thumbnail;

    return { ingredient, drinks };
  } catch (error: any) {
    throw new Error("Something went wrong", error.message);
  }
}
