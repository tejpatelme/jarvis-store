import "./Cart.css";
import { useUserData } from "../../contexts";
import {
  CartCard,
  TotalPriceCard,
  Heading,
  EmptyMessage,
} from "../../components";

export default function Cart() {
  const {
    state: { cart },
  } = useUserData();

  return (
    <div className="cart-page">
      {cart.length > 0 ? (
        <>
          <Heading title="Cart" noOfProducts={cart.length} />
          <div className="cart-container">
            <div className="cart-products-container">
              {cart.map((product) => {
                return <CartCard key={product._id} product={product} />;
              })}
            </div>
            <TotalPriceCard />
          </div>
        </>
      ) : (
        <EmptyMessage type="cart" />
      )}
    </div>
  );
}
