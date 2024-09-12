import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { CocktailInfoPage, ErrorPage, HomePage, SearchPage } from "./pages";
import { RootLayout } from "./layouts";
import { cocktailInfoLoader, randomCocktailLoader } from "./loaders";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} path="/">
      <Route element={<HomePage />} loader={randomCocktailLoader} index />
      <Route element={<SearchPage />} path="search" />
      <Route element={<CocktailInfoPage />} loader={cocktailInfoLoader} path="cocktail-info/:id" />
      <Route element={<ErrorPage />} path="*" />
    </Route>
  )
);
