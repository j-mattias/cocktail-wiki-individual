import { Outlet } from "react-router-dom";
import { Header } from "../components";
import { FavoriteDrinksContextProvider, SearchContextProvider } from "../contexts";

export function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <FavoriteDrinksContextProvider>
          <SearchContextProvider>
            <Outlet />
          </SearchContextProvider>
        </FavoriteDrinksContextProvider>
      </main>
    </>
  );
}