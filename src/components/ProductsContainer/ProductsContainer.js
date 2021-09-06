import "./ProductsContainer.css";
import { ProductCard } from "../";

export default function ProductsContainer({ filteredProducts }) {
  return (
    <>
      <div className="prod-container">
        {filteredProducts.map((prod) => {
          return <ProductCard key={prod._id} details={prod} />;
        })}
      </div>
    </>
  );
}
