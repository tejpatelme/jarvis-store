import { useState } from "react";
import {
  ProductsContainer,
  Sidebar,
  MobileSortAndFilter,
  MobileSortMenu,
  MobileFilterMenu,
} from "../../components";
import { useProduct, useGetProducts } from "../../contexts";

export default function Products() {
  const [mobileSortMenuOpen, setMobileSortMenuOpen] = useState(false);
  const [mobileFilterMenuOpen, setMobileFilterMenuOpen] = useState(false);
  const {
    state: { showOnlyInStock, showOnlyFastDelivery, sortBy },
    dispatch,
  } = useProduct();

  const { products } = useGetProducts();

  const sortProducts = (products, sortBy) => {
    if (sortBy === "HIGH_TO_LOW") {
      return products.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "LOW_TO_HIGH") {
      return products.sort((a, b) => a.price - b.price);
    }

    return products;
  };

  const filterProdcuts = (
    products,
    { showOnlyInStock, showOnlyFastDelivery }
  ) => {
    const newArr = showOnlyInStock
      ? products.filter((prod) => prod.inStock)
      : products;

    const newArr2 = showOnlyFastDelivery
      ? newArr.filter((prod) => prod.fastDelivery)
      : newArr;

    return newArr2;
  };

  const sortedProducts = sortProducts(products, sortBy);

  const filteredProducts = filterProdcuts(sortedProducts, {
    showOnlyInStock,
    showOnlyFastDelivery,
  });

  return (
    <div className="flex">
      <Sidebar>
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

        <div className="nav-header">Filter</div>
        <label>
          <input
            checked={showOnlyInStock}
            type="checkbox"
            onChange={() => dispatch({ TYPE: "SHOW_ONLY_IN_STOCK" })}
          />
          Exclude out of stock
        </label>
        <br />
        <label>
          <input
            checked={showOnlyFastDelivery}
            type="checkbox"
            onChange={() => dispatch({ TYPE: "SHOW_ONLY_FAST_DELIVERY" })}
          />
          Show fast delivery only
        </label>
      </Sidebar>
      <ProductsContainer filteredProducts={filteredProducts} />
      {mobileSortMenuOpen && (
        <MobileSortMenu setMobileSortMenuOpen={setMobileSortMenuOpen} />
      )}
      {mobileFilterMenuOpen && (
        <MobileFilterMenu setMobileFilterMenuOpen={setMobileFilterMenuOpen} />
      )}
      <MobileSortAndFilter
        setMobileSortMenuOpen={setMobileSortMenuOpen}
        setMobileFilterMenuOpen={setMobileFilterMenuOpen}
      />
    </div>
  );
}
