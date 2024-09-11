import { useNavigate } from "react-router-dom"

export function RandomizeButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")}>Randomize</button>
  )
}
