import { useNavigate } from "react-router";
import "./CategoryCard.css";
import { useProduct } from "../../contexts";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  const { dispatch } = useProduct();

  const onCategoryClick = () => {
    dispatch({ type: "RESET_FILTERS" });
    dispatch({
      type: "FILTER_BY_CATEGORIES",
      payload: { category: category.name },
    });
    navigate("/products");
  };

  return (
    <div onClick={onCategoryClick} className="category-card">
      <img src={category.image} alt="category" />
      <span className="category-name">{category.name}</span>
    </div>
  );
}
