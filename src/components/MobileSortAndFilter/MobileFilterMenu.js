import { useProduct } from "../../contexts";

export default function MobileFilterMenu({ setMobileFilterMenuOpen }) {
  const {
    state: { showOnlyInStock, showOnlyFastDelivery },
    dispatch,
  } = useProduct();
  return (
    <div className="sortfilter-container">
      <button
        onClick={() => setMobileFilterMenuOpen(false)}
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
        <div className="nav-header">Filter</div>
        <label>
          <input
            checked={showOnlyInStock}
            type="checkbox"
            onChange={() => dispatch({ type: "SHOW_ONLY_IN_STOCK" })}
          />
          Exclude out of stock
        </label>
        <br />
        <label>
          <input
            checked={showOnlyFastDelivery}
            type="checkbox"
            onChange={() => dispatch({ type: "SHOW_ONLY_FAST_DELIVERY" })}
          />
          Show fast delivery only
        </label>
      </div>
    </div>
  );
}
