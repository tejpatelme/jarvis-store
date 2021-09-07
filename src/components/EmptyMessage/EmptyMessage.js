import "./EmptyMessage.css";
import cart from "../../assests/cart.svg";
import wishlist from "../../assests/Vector.svg";

export default function EmptyMessage({ type }) {
  return (
    <div className="empty-message-page">
      <img src={type === "cart" ? cart : wishlist} alt="empty-cart" />
      <h2>
        {type === "cart" ? "Your cart is empty" : "Your wishlist is empty"}
      </h2>
    </div>
  );
}
