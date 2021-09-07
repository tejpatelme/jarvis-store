import { useNavigate } from "react-router";
import "./BackButton.css";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleBackButtonClick} className="back-button">
      <span className="material-icons-round">arrow_back</span>
    </button>
  );
}
