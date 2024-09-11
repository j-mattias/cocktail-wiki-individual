import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { HomePage, SearchPage } from "./pages";
import { RootLayout } from "./layouts";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} path="/">
      <Route element={<HomePage />} index />
      <Route element={<SearchPage />} path="search" />
    </Route>
  )
);
