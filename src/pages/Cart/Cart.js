import "./Cart.css";
import { useUserData } from "../../contexts";
import { CartCard, TotalPriceCard } from "../../components";

export default function Cart() {
  const {
    state: { cart },
  } = useUserData();

  return (
    <div className="cart-page">
      <div className="cart-products-container">
        {cart.map((product) => {
          return <CartCard key={product._id} product={product} />;
        })}
      </div>
      <TotalPriceCard />
      {/* <h3 className="mb-3">Cart {cart.length} Items</h3> */}
    </div>
  );
}
