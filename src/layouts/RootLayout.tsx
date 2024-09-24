import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading, ScrollToTop } from "../components";
import { FavoriteDrinksContextProvider, SearchContextProvider } from "../contexts";

export function RootLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <Header />
      <main>
        <FavoriteDrinksContextProvider>
          <SearchContextProvider>
            {isLoading ? <Loading /> : <Outlet />}
          </SearchContextProvider>
        </FavoriteDrinksContextProvider>
        <ScrollToTop />
      </main>
    </>
  );
}
