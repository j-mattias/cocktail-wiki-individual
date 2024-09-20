import { useEffect, useRef, useState } from "react";
import { IIngredient } from "../interfaces";

interface IIngredientDescriptionProps {
  ingredient: IIngredient;
}

export default function IngredientDescription({ ingredient }: IIngredientDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [heightChange, setHeightChange] = useState<number>(0);

  const descContainer = useRef<HTMLParagraphElement>(null);

  const description = ingredient.strDescription ? ingredient.strDescription : "";

  // Split the description into paragraphs as the linebreaks get escaped otherwise
  const paragraphs = description.split("\r\n\r\n");

  // Expand/collapse the description
  const handleExpand = () => {
    if (descContainer.current) {
      const offsetHeight = descContainer.current.offsetHeight;
      const scrollHeight = descContainer.current.scrollHeight;

      // Compare the height of the container with its contents total height
      if (offsetHeight !== scrollHeight) {
        descContainer.current.style.maxHeight = `${scrollHeight}px`;
        setIsExpanded(true);
      } else {
        descContainer.current.style.maxHeight = "";
        setIsExpanded(false);
      }
    }
  };

  useEffect(() => {
    if (descContainer.current) {

      // If the content can't fit in the container, display the read more button
      const isContainerTooSmall =
        descContainer.current.offsetHeight !== descContainer.current.scrollHeight;
      setShowButton(isContainerTooSmall);
    }
  }, [heightChange]);

  // Add listener to window to track offsetHeight of the description container so that
  // the read more button will hide or show depending on height
  useEffect(() => {
    const trackOffsetHeight = () => {
      setHeightChange(descContainer.current!.offsetHeight);
    };

    window.addEventListener("resize", trackOffsetHeight);
    return () => window.removeEventListener("resize", trackOffsetHeight);
  }, []);

  return (
    <article className="ingredient-description">
      <h2>Description</h2>
      <div ref={descContainer} className={`ingredient-description__container`}>
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {showButton && (
        <button className={!isExpanded ? "taper-text" : ""} onClick={handleExpand}>
          {!isExpanded ? "Read more" : "Read less"}
        </button>
      )}
    </article>
  );
}
