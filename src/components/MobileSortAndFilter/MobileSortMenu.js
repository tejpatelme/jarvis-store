import { useProduct } from "../../contexts";

export default function MobileSortMenu({ setMobileSortMenuOpen }) {
  const { dispatch } = useProduct();
  return (
    <div className="sortfilter-container">
      <button
        onClick={() => setMobileSortMenuOpen(false)}
        className="close-button btn"
      >
        <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24">
          <path
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      <div className="sortfilter-wrapper">
        <div className="nav-header">Sort</div>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ TYPE: "SORT_BY", PAYLOAD: "HIGH_TO_LOW" })
            }
          />{" "}
          High To Low
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ TYPE: "SORT_BY", PAYLOAD: "LOW_TO_HIGH" })
            }
          />{" "}
          Low To High
        </label>
      </div>
    </div>
  );
}
