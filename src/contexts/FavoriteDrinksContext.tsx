import { createContext, ReactNode, useContext, useState } from "react";
import { IDrinkReformat } from "../interfaces";

interface IFavoriteDrinksContextProviderProps {
  children: ReactNode;
}

type TDrinkArray = IDrinkReformat[] | [];

interface IFavoriteDrinksContext {
  favoriteDrinks: TDrinkArray;
  setFavoriteDrinks: React.Dispatch<React.SetStateAction<TDrinkArray>>;
}

const FavoriteDrinksContext = createContext<IFavoriteDrinksContext | null>(null);

export function FavoriteDrinksContextProvider({ children }: IFavoriteDrinksContextProviderProps) {
  const [favoriteDrinks, setFavoriteDrinks] = useState<TDrinkArray>([]);

  return (
    <FavoriteDrinksContext.Provider value={{ favoriteDrinks, setFavoriteDrinks }}>
      {children}
    </FavoriteDrinksContext.Provider>
  );
}

export function useFavoriteDrinksContext() {
  const context = useContext(FavoriteDrinksContext);

  // Throw error if context is used outside the provider
  if (!context) {
    throw new Error(
      "useFavoriteDrinksContext needs to be used within favoriteDrinksContextProvider"
    );
  }

  return context;
}
