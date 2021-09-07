import { useAuth, useUserData, useToast } from "../../contexts";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import API from "../../services/api/api-urls";
import "./ProductCard.css";
import { Spinner } from "..";

export default function ProductCard({ details }) {
  const {
    state: { wishlist },
    dispatch,
  } = useUserData();
  const {
    userLogin: { isLoggedIn },
  } = useAuth();
  const { _id, name, price, imageURL, software } = details;
  const { dispatch: toastDispatch } = useToast();
  const { postData: addToWishlist, loading: addToWishlistStatus } = useAxios(
    API.GET_WISHLIST
  );
  const navigate = useNavigate();

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (isLoggedIn === false) {
      return toastDispatch({
        type: "INFO",
        payload: { message: "Login Required" },
      });
    }

    const data = await addToWishlist({ productId: _id });

    if (data?.success) {
      dispatch({ type: "HANDLE_WISHLIST", payload: { product: details } });
    }
  };

  const navigateToDescription = () => {
    navigate(`/products/${_id}`);
  };

  const generateWishlistIcon = () => {
    return wishlist.find((product) => product._id === _id) ? (
      <span className="material-icons-outlined">favorite</span>
    ) : (
      <span className="material-icons-outlined">favorite_border</span>
    );
  };

  return (
    <div onClick={navigateToDescription} className="product-card">
      <button className="card-button" onClick={handleWishlist}>
        {addToWishlistStatus ? <Spinner /> : generateWishlistIcon()}
      </button>
      <div className="product-image-container">
        <img src={imageURL} alt="product" className="product-image" />
      </div>
      <p className="product-name">{name}</p>
      <div className="product-extra-details">
        <span className="badge badge-rating badge-blue">{software}</span>
        <span className="badge badge-rating badge-green">₹{price}</span>
      </div>
    </div>
  );
}
