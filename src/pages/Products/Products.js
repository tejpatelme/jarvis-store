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
      <Sidebar />
      <ProductsContainer filteredProducts={filteredBySoftware} />
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
