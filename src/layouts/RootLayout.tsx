import { Outlet } from "react-router-dom";
import { Header } from "../components";
import { FavoriteDrinksContextProvider } from "../contexts";

export function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <FavoriteDrinksContextProvider>
          <Outlet />
        </FavoriteDrinksContextProvider>
      </main>
    </>
  );
}