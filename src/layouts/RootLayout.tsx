import { Outlet } from "react-router-dom";
import { Header } from "../components";

export function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}