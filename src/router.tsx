import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { CocktailErrorPage, CocktailInfoPage, ErrorPage, FavoritePage, HomePage, IngredientPage, SearchPage } from "./pages";
import { RootLayout } from "./layouts";
import { cocktailInfoLoader, getIngredientInfo, randomCocktailLoader } from "./loaders";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} path="/">
      <Route element={<HomePage />} loader={randomCocktailLoader} index />
      <Route element={<SearchPage />} path="search" />
      <Route errorElement={<CocktailErrorPage />}>
        <Route
          element={<CocktailInfoPage />}
          loader={cocktailInfoLoader}
          path="cocktail-info/:id"
        />
        <Route element={<IngredientPage />} loader={getIngredientInfo} path="ingredient/:name" />
      </Route>
      <Route element={<FavoritePage />} path="favorites" />
      <Route element={<ErrorPage />} path="*" />
    </Route>
  ),
  { basename: "/cocktail-wiki-individual/" }
);
