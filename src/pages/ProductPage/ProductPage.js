import "./ProductPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProducts, useAuth, useToast, useUserData } from "../../contexts";
import useAxios from "../../hooks/useAxios";
import API from "../../services/api/api-urls";
import { BackButton, ProductCard, Spinner } from "../../components";

export default function ProductPage() {
  const { id } = useParams();
  const { products } = useGetProducts();
  const {
    state: { cart, wishlist },
  } = useUserData();
  const { dispatch } = useUserData();
  const {
    userLogin: { isLoggedIn },
  } = useAuth();
  const { dispatch: toastDispatch } = useToast();
  const { postData: addToCart, loading: addToCartStatus } = useAxios(
    API.ADD_TO_CART
  );
  const { postData: addToWishlist, loading: addToWishlistStatus } = useAxios(
    API.GET_WISHLIST
  );
  const navigate = useNavigate();
  const product = products.find((product) => product._id === id);

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (isLoggedIn === false) {
      return toastDispatch({
        type: "INFO",
        payload: { message: "Login Required" },
      });
    }

    const data = await addToWishlist({ productId: id });

    if (data?.success) {
      dispatch({ type: "HANDLE_WISHLIST", payload: { product: product } });
    }
  };

  const handleAddToCart = async (e) => {
    if (isLoggedIn === false) {
      return toastDispatch({
        type: "INFO",
        payload: { message: "Login Required" },
      });
    }

    if (e.target.innerText === "Go To Cart") {
      return navigate("/cart");
    }

    const data = await addToCart({ productId: id });

    if (data?.success) {
      dispatch({ type: "ADD_TO_CART", payload: { product } });

      toastDispatch({
        type: "SUCCESS",
        payload: { message: "Added to cart" },
      });
    }
  };

  const generateButtonText = () => {
    return cart.find((product) => product._id === id)
      ? "Go To Cart"
      : "Add to cart";
  };

  const generateWishlistIcon = () => {
    return wishlist.find((product) => product._id === id) ? (
      <span className="material-icons-outlined">favorite</span>
    ) : (
      <span className="material-icons-outlined">favorite_border</span>
    );
  };

  return (
    <>
      {product ? (
        <div className="product-page">
          <div className="flex items-center">
            <BackButton />
            <h1 className="product-page-heading">{product.name}</h1>
          </div>

          <div className="product-page-container">
            <div className="product-page-image-container">
              <img
                src={product.imageURL}
                alt="product"
                className="product-page-image"
              />
            </div>

            <div className="product-page-details">
              <h4 className="product-details-caption">Description</h4>
              <p className="mb-3">{product.description}</p>

              <div className="mb-5">
                <h4 className="product-details-caption">Overview</h4>
                <p className="text-gray-500 mb-1">
                  <span className="text-medium">Software</span> :{" "}
                  {product.software}
                </p>
                <p className="text-gray-500 mb-1">
                  <span className="text-medium">Category</span> :{" "}
                  {product.category}
                </p>
                <p className="text-gray-500">
                  <span className="text-medium">By</span> : {product.by}
                </p>
              </div>

              <div className="flex">
                <button
                  onClick={handleAddToCart}
                  className="product-page-addtocart"
                  disabled={addToCartStatus}
                >
                  {addToCartStatus ? <Spinner /> : generateButtonText()}
                </button>

                <button
                  onClick={handleWishlist}
                  disabled={addToWishlistStatus}
                  style={{ border: "1px solid lightgray" }}
                  className=" btn p-3 flex"
                >
                  {addToWishlistStatus ? <Spinner /> : generateWishlistIcon()}
                </button>
              </div>
            </div>
          </div>

          <h2>Similar Products</h2>
          <div className="wishlist-container">
            {products
              .filter(
                (item) =>
                  item.category === product.category && item._id !== product._id
              )
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product._id} details={product} />
              ))}
          </div>
        </div>
      ) : (
        <div
          style={{ height: "60vh", width: "100%" }}
          className="flex items-center justify-center"
        >
          <Spinner size={60} />
        </div>
      )}
    </>
  );
}
