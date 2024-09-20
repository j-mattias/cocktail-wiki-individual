import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [showToTop, setShowToTop] = useState<boolean>(false);

  // Scroll the window to the top
  const handleToTop = () => {
    window.scrollTo(0, 0);
  };

  // Add a listener to the window to check how far it's scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setShowToTop(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <i
      className={`scroll-to-top fa-solid fa-arrow-up fa-2x ${showToTop ? "slide-in" : "slide-out"}`}
      onClick={handleToTop}
    ></i>
  );
}
