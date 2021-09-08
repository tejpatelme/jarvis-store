import "./TotalPriceCard.css";
import { useUserData } from "../../contexts/userdata-context";
import { useEffect, useState } from "react";
import { makePayment } from "../../services/payment/razorpay-payment";

export default function TotalPriceCard() {
  const [cartTotal, setCartTotal] = useState(0);

  const {
    state: { cart },
  } = useUserData();

  const handleCheckout = async () => {
    const response = await makePayment({ amount: cartTotal });
    console.log(response);
  };

  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce(
        (accum, curProduct) => accum + curProduct.price * curProduct.qty,
        0
      );
      return setCartTotal(total);
    }
    return setCartTotal(0);
  }, [cart]);

  return (
    <>
      {cart.length > 0 && (
        <div className="total-price-container">
          <h3 className="total-price-heading">Cart Total</h3>
          <span className="total-price-amount">₹ {cartTotal}</span>
          <button
            onClick={handleCheckout}
            className="total-price-checkout-button"
          >
            Proceed To Checkout
          </button>
        </div>
      )}
    </>
  );
}
