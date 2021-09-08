import { useNavigate } from "react-router";
import { Spinner } from "..";
import { useToast, useUserData } from "../../contexts";
import useAxios from "../../hooks/useAxios";
import API from "../../services/api/api-urls";

export default function WishlistCard({ product }) {
  const { dispatch } = useUserData();
  const navigate = useNavigate();
  const { dispatch: toastDispatch } = useToast();
  const { postData: removeFromWishlist, loading: removeFromWishlistStatus } =
    useAxios(API.GET_WISHLIST);

  const handleRemoveFromWishlist = async (e, id) => {
    e.stopPropagation();
    const data = await removeFromWishlist({ productId: id });
    if (data?.success) {
      dispatch({ type: "HANDLE_WISHLIST", payload: { product: { _id: id } } });
      toastDispatch({
        type: "INFO",
        payload: { message: "Removed from wishlist" },
      });
    }
  };

  const navigateToDescription = (id) => {
    navigate(`/products/${id}`);
  };
  return (
    <div
      key={product._id}
      onClick={() => navigateToDescription(product._id)}
      className="product-card"
    >
      <button
        onClick={(e) => handleRemoveFromWishlist(e, product._id)}
        className="card-button"
        disabled={removeFromWishlistStatus}
      >
        {removeFromWishlistStatus ? (
          <Spinner />
        ) : (
          <span className="material-icons-round">close</span>
        )}
      </button>

      <div className="product-image-container">
        <img src={product.imageURL} alt="product" className="product-image" />
      </div>
      <p className="product-name">{product.name}</p>
      <div className="product-extra-details">
        <span className="badge badge-rating badge-blue">
          {product.software}
        </span>
        <span className="badge badge-rating badge-green">₹{product.price}</span>
      </div>
    </div>
  );
}
