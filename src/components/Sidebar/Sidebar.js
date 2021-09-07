import { useGetProducts, useProduct } from "../../contexts";
import "./Sidebar.css";

export default function Sidebar({ showSortAndFilter, setShowSortAndFilter }) {
  const { products } = useGetProducts();
  let categories = products.map((product) => product.category);
  categories = categories.filter(
    (category, idx) => categories.indexOf(category) === idx
  );
  let softwares = products.map((product) => product.software);
  softwares = softwares.filter(
    (software, idx) => softwares.indexOf(software) === idx
  );

  const {
    state: { sortBy, categoriesSelected, softwaresSelected },
    dispatch,
  } = useProduct();

  return (
    <div
      className={`sidebar ${
        showSortAndFilter ? "show-sidebar" : "hide-sidebar"
      }`}
    >
      <div className="nav-header">Sort</div>
      <div className="label-container">
        <label className="nav-label">
          <input
            type="radio"
            name="sort"
            checked={sortBy === "HIGH_TO_LOW"}
            onChange={() =>
              dispatch({ type: "SORT_BY", payload: "HIGH_TO_LOW" })
            }
          />{" "}
          High To Low
        </label>
        <label className="nav-label">
          <input
            type="radio"
            name="sort"
            checked={sortBy === "LOW_TO_HIGH"}
            onChange={() =>
              dispatch({ type: "SORT_BY", payload: "LOW_TO_HIGH" })
            }
          />{" "}
          Low To High
        </label>
      </div>

      <div className="nav-header">CATEGORIES</div>
      <div className="label-container">
        {categories.map((category) => (
          <label key={category} className="nav-label">
            <input
              type="checkbox"
              value={category}
              checked={
                categoriesSelected.find((item) => item === category)
                  ? true
                  : false
              }
              onChange={(e) =>
                dispatch({
                  type: "FILTER_BY_CATEGORIES",
                  payload: { category: e.target.value },
                })
              }
            />{" "}
            {category}
          </label>
        ))}
      </div>

      <div className="nav-header">SOFTWARES</div>
      <div className="label-container">
        {softwares.map((software) => (
          <label key={software} className="nav-label">
            <input
              type="checkbox"
              value={software}
              checked={
                softwaresSelected.find((item) => item === software)
                  ? true
                  : false
              }
              onChange={(e) =>
                dispatch({
                  type: "FILTER_BY_SOFTWARE",
                  payload: { software: e.target.value },
                })
              }
            />{" "}
            {software}
          </label>
        ))}
      </div>

      <button
        onClick={() => dispatch({ type: "RESET_FILTERS" })}
        className="btn p-2"
      >
        Reset Filters
      </button>

      <button
        onClick={() => setShowSortAndFilter(false)}
        className="btn close-button"
      >
        <span className="material-icons-round">close</span>
      </button>
    </div>
  );
}
