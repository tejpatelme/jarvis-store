import "./ProductsContainer.css";
import { ProductCard } from "../";
import { Heading } from "../../components";

export default function ProductsContainer({ filteredProducts }) {
  return (
    <div style={{flexGrow: 1}}>
      <Heading title="All Products" noOfProducts={filteredProducts.length} />
      <div className="prod-container">
        {filteredProducts.map((prod) => {
          return <ProductCard key={prod._id} details={prod} />;
        })}
      </div>
    </div>
  );
}
