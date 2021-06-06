import { useState } from "react";
import axios from "axios";
import { useAuth, useUserData, useToast } from "../../contexts";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ details }) {
  const {
    state: { wishlist },
    dispatch,
  } = useUserData();
  const { user, isLoggedIn } = useAuth();
  const { _id: id, brand, name, price, image, fastDelivery, inStock } = details;
  const { dispatch: toastDispatch } = useToast();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (isLoggedIn === false) {
      navigate("/login");
      return;
    }

    const match = wishlist.find((prod) => prod._id === id);
    if (match) {
      try {
        toastDispatch({
          type: "INFO",
          payload: {
            message: "Removing Item from wishlist",
            autoCloseInterval: 1000,
          },
        });
        const { data: updateWishlist } = await axios.delete(
          `https://api-jarvis-store.herokuapp.com/wishlist/${user.wishlistId}`,
          { data: { productId: id } }
        );
        console.log(updateWishlist);
        dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
        toastDispatch({
          type: "ERROR",
          payload: { message: "Removed item from Wishlist" },
        });
      } catch (err) {
        console.log(err.response);
      }
      return;
    }
    try {
      toastDispatch({
        type: "INFO",
        payload: { message: "Adding to wishlist", autoCloseInterval: 1000 },
      });
      await axios.post(
        `https://api-jarvis-store.herokuapp.com/wishlist/${user.wishlistId}`,
        { productId: id }
      );
      dispatch({ type: "ADD_TO_WISHLIST", payload: details });
      toastDispatch({
        type: "SUCCESS",
        payload: { message: "Added item to Wishlist" },
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isLoggedIn === false) {
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const {
        data: {
          updatedCart: { products },
        },
        status,
      } = await axios.post(
        `https://api-jarvis-store.herokuapp.com/cart/${user.cartId}`,
        {
          productId: id,
        }
      );

      if (status === 200) {
        dispatch({ type: "SET_CART", payload: products });
        toastDispatch({
          type: "SUCCESS",
          payload: { message: "Added to cart" },
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const navigateToDescription = () => {
    navigate(`${id}`);
  };

  return (
    <div
      onClick={navigateToDescription}
      className="product-card shadow-sm mb-4"
    >
      <div className="product-image">
        <img
          //   loading="lazy"
          width="200px"
          height="150px"
          src={image}
          alt="product"
        />
      </div>
      <div className="product-details">
        <h4 className="text-base">{brand}</h4>
        <p className="text-sm mb-2">{name}</p>
        <span className="text-md font-semibold">Rs. {price}</span>
        <br />
        <button
          // style={{ width: "100%" }}
          className="btn btn-sm btn-primary mt-3"
          onClick={handleAddToCart}
        >
          {loading ? (
            <i className="fas fa-circle-notch fa-pulse mr-2"></i>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
      <button className="card-button" onClick={handleWishlist}>
        {wishlist.find((prod) => prod._id === id) ? (
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"
              fill="red"
            ></path>
          </svg>
        ) : (
          <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24">
            <path d="M12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3z"></path>
          </svg>
        )}
      </button>
      {fastDelivery && inStock && (
        <span className="badge badge-text badge-blue">Fast Delivery</span>
      )}
    </div>
  );
}
