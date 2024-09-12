import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { ErrorPage, HomePage, SearchPage } from "./pages";
import { RootLayout } from "./layouts";
import { randomCocktailLoader } from "./loaders";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} path="/">
      <Route element={<HomePage />} loader={randomCocktailLoader} index />
      <Route element={<SearchPage />} path="search" />
      <Route element={<ErrorPage />} path="*" />
    </Route>
  )
);
