import "./TotalPriceCard.css";
import { useUserData } from "../../contexts/userdata-context";
import { useEffect, useState } from "react";
import { makePayment } from "../../services/payment/razorpay-payment";
import { Spinner } from "../";

export default function TotalPriceCard() {
  const [cartTotal, setCartTotal] = useState(0);
  const [checkoutStatus, setCheckoutStatus] = useState("idle");

  const {
    state: { cart },
  } = useUserData();

  const handleCheckout = async () => {
    setCheckoutStatus("loading");
    try {
      await makePayment({ amount: cartTotal });
      setCheckoutStatus("fulfilled");
    } catch {
      setCheckoutStatus("rejected");
    }
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
            disabled={checkoutStatus === "loading"}
            onClick={handleCheckout}
            className="total-price-checkout-button"
          >
            {checkoutStatus === "Loading" ? <Spinner /> : "Proceed To Checkout"}
          </button>
        </div>
      )}
    </>
  );
}
