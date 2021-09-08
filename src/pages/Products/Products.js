import "./Products.css";
import { useState } from "react";
import { ProductsContainer, Sidebar, Spinner } from "../../components";
import { useProduct, useGetProducts } from "../../contexts";

export default function Products() {
  const [showSortAndFilter, setShowSortAndFilter] = useState(false);
  const {
    state: { sortBy, categoriesSelected, softwaresSelected },
  } = useProduct();

  const { products } = useGetProducts();

  const sortProducts = (data, sortBy) => {
    if (sortBy === "HIGH_TO_LOW") {
      return data.slice().sort((a, b) => b.price - a.price);
    }

    if (sortBy === "LOW_TO_HIGH") {
      return data.slice().sort((a, b) => a.price - b.price);
    }

    return data;
  };

  const filterByCategories = (sortedProducts) => {
    if (categoriesSelected.length === 0) {
      return sortedProducts;
    }

    return sortedProducts.filter((product) =>
      categoriesSelected.includes(product.category)
    );
  };

  const filterBySoftwares = (filteredByCategory) => {
    if (softwaresSelected.length === 0) {
      return filteredByCategory;
    }

    return filteredByCategory.filter((product) =>
      softwaresSelected.includes(product.software)
    );
  };

  const sortedProducts = sortProducts(products, sortBy);
  const filteredByCategory = filterByCategories(sortedProducts);
  const filteredBySoftware = filterBySoftwares(filteredByCategory);

  return (
    <div className="flex">
      <button
        className="btn filter-button shadow-md"
        onClick={() => setShowSortAndFilter(true)}
      >
        <span className="material-icons-round">filter_alt</span>
      </button>
      {products.length > 0 ? (
        <>
          <Sidebar
            setShowSortAndFilter={setShowSortAndFilter}
            showSortAndFilter={showSortAndFilter}
          />
          <ProductsContainer filteredProducts={filteredBySoftware} />
        </>
      ) : (
        <div
          style={{ height: "60vh", width: "100%" }}
          className="flex items-center justify-center"
        >
          <Spinner size={60} />
        </div>
      )}
    </div>
  );
}
