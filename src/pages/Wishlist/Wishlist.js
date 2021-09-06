import "./Wishlist.css";
import { useToast, useUserData } from "../../contexts";
import API from "../../services/api/api-urls";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";

export default function Wishlist() {
  const {
    state: { wishlist, cart },
    dispatch,
  } = useUserData();
  const navigate = useNavigate();
  const { dispatch: toastDispatch } = useToast();
  const { postData: removeFromWishlist } = useAxios(API.GET_WISHLIST);
  const { postData: moveToCart } = useAxios(API.ADD_TO_CART);

  const handleRemoveFromWishlist = async (id) => {
    const data = await removeFromWishlist({ productId: id });
    if (data?.success) {
      dispatch({ type: "HANDLE_WISHLIST", payload: { product: { _id: id } } });
      toastDispatch({
        type: "INFO",
        payload: { message: "Removed from wishlist" },
      });
    }
  };

  const handleMoveToCart = async (e, prod) => {
    if (e.target.innerText === "Go to cart") {
      return navigate("/cart");
    }

    const data = await moveToCart({ productId: prod._id });

    if (data?.success) {
      dispatch({ type: "ADD_TO_CART", payload: { product: prod } });

      await removeFromWishlist({ productId: prod._id });

      dispatch({
        type: "HANDLE_WISHLIST",
        payload: { product: { _id: prod._id } },
      });

      toastDispatch({
        type: "INFO",
        payload: { message: "Moved to cart" },
      });
    }
  };

  const generateButtonText = (id) => {
    return cart.find((product) => product._id === id)
      ? "Go to cart"
      : "Move to cart";
  };

  return (
    <div className="wishlist-container">
      <h3 className="mb-3">Wishlist {wishlist.length} Items</h3>
      <div className="wishlist-items-wrapper">
        {wishlist.map((prod) => {
          const { _id, image, brand, name, price } = prod;

          return (
            <div key={_id} className="product-card shadow-sm mb-4">
              <div className="product-image">
                <img width="200px" height="150px" src={image} alt="product" />
              </div>
              <div className="product-details">
                <h4 className="text-base">{brand}</h4>
                <p className="text-sm mb-2">{name}</p>
                <span className="text-sm">Rs. {price}</span>
                <br />
                <button
                  onClick={(e) => handleMoveToCart(e, prod)}
                  className="btn btn-sm btn-primary mt-3"
                >
                  {generateButtonText(_id)}
                </button>
              </div>
              <button
                className="card-button"
                onClick={() => handleRemoveFromWishlist(_id)}
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
