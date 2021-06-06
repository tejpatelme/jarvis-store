import "./Wishlist.css";
import axios from "axios";
import { useAuth, useToast, useUserData } from "../../contexts";

export default function Wishlist() {
  const {
    state: { wishlist },
    dispatch,
  } = useUserData();

  const { user } = useAuth();
  const { dispatch: toastDispatch } = useToast();

  const removeFromWishlist = async (id) => {
    try {
      const { status } = await axios.delete(
        `https://api-jarvis-store.herokuapp.com/wishlist/${user.wishlistId}`,
        { data: { productId: id } }
      );
      if (status === 200) {
        dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const moveToCart = async (id) => {
    try {
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
          type: "INFO",
          payload: {
            message: "Item moved to cart",
            autoCloseInterval: 3000,
          },
        });
      }

      await axios.delete(
        `https://api-jarvis-store.herokuapp.com/wishlist/${user.wishlistId}`,
        { data: { productId: id } }
      );
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="wishlist-container">
      <h3 className="mb-3">Wishlist {wishlist.length} Items</h3>
      <div className="wishlist-items-wrapper">
        {wishlist.map((prod) => {
          const { _id: id, image, brand, name, price } = prod;

          return (
            <div key={id} className="product-card shadow-sm mb-4">
              <div className="product-image">
                <img width="200px" height="150px" src={image} alt="product" />
              </div>
              <div className="product-details">
                <h4 className="text-base">{brand}</h4>
                <p className="text-sm mb-2">{name}</p>
                <span className="text-sm">Rs. {price}</span>
                <br />
                <button
                  onClick={() => moveToCart(id)}
                  className="btn btn-sm btn-primary mt-3"
                >
                  Move to cart
                </button>
              </div>
              <button
                className="card-button"
                onClick={() => removeFromWishlist(id)}
              >
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"></path>
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
