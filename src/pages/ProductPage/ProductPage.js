import "./ProductPage.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProducts, useAuth, useToast, useUserData } from "../../contexts";

export default function ProductPage() {
  const { id } = useParams();
  const { products } = useGetProducts();
  const { dispatch } = useUserData();
  const { user, isLoggedIn } = useAuth();
  const { dispatch: toastDispatch } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    // if (isLoggedIn === false) {
    //   navigate("/login");
    //   return;
    // }
    // try {
    //   setLoading(true);
    //   const {
    //     data: {
    //       updatedCart: { products },
    //     },
    //     status,
    //   } = await axios.post(
    //     `https://api-jarvis-store.herokuapp.com/cart/${user.cartId}`,
    //     {
    //       productId: id,
    //     }
    //   );
    //   if (status === 200) {
    //     dispatch({ type: "SET_CART", payload: products });
    //     toastDispatch({
    //       type: "SUCCESS",
    //       payload: { message: "Added to cart" },
    //     });
    //   }
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   setLoading(false);
    // }
  };
  const match = products.find((product) => product._id === id);
  const { image, brand, name, price, fastDelivery } = match;
  return (
    <div className="product-page-container">
      <img src={image} alt="product" className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <p className="product-brand">By {brand}</p>
        <p className="product-price">₹ {price}</p>
        <p>Fast Delivery: {fastDelivery ? "Available" : "Not Available"}</p>
        <button onClick={handleAddToCart} className="btn btn-md btn-primary">
          {loading ? (
            <i className="fas fa-circle-notch fa-pulse mr-2"></i>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </div>
  );
}
