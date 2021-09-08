import { Spinner } from "..";
import { useToast, useUserData } from "../../contexts";
import useAxios from "../../hooks/useAxios";
import API from "../../services/api/api-urls";

export default function CartCard({ product }) {
  const { dispatch } = useUserData();
  const { dispatch: toastDispatch } = useToast();
  const { postData: removeFromCart, loading: removeFromCartStatus } = useAxios(
    API.REMOVE_PRODUCT
  );
  const { postData: DecreaseQuantity, loading: decreaseQuantityStatus } =
    useAxios(API.DECREASE_PRODUCT_QUANTITY);
  const { postData: IncreaseQuantity, loading: increaseQuantityStatus } =
    useAxios(API.INCREASE_PRODUCT_QUANTITY);

  const handleRemoveFromCart = async (id) => {
    const data = await removeFromCart({ productId: id });

    if (data?.success) {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: {
          product: { _id: id },
        },
      });

      toastDispatch({
        type: "INFO",
        payload: { message: "Removed from cart" },
      });
    }
  };

  const handleDecreaseQuantity = async (id) => {
    const data = await DecreaseQuantity({ productId: id });

    if (data?.success) {
      dispatch({
        type: "DECREASE_QUANTITY",
        payload: { product: { _id: id } },
      });
    }
  };

  const handleIncreaseQuantity = async (id) => {
    const data = await IncreaseQuantity({
      productId: id,
    });

    if (data?.success) {
      dispatch({
        type: "INCREASE_QUANTITY",
        payload: { product: { _id: id } },
      });
    }
  };

  return (
    <div className="cart-card">
      <div>
        <img
          src={product.imageURL}
          alt="product"
          className="cart-product-image"
        />
      </div>

      <div className="cart-product-details">
        <div className="self-start">
          <span className="cart-product-name">
            {product.name} <span className="text-base">by</span> {product.by}
          </span>
          <span className="cart-product-license">
            <span className="text-medium text-sm">License</span> • Standard
            License
          </span>
          <div className="flex align-center">
            <div className="cart-product-price-mobile">
              <p className="text-bold text-lg block">₹ {product.price}</p>
              <button
                onClick={() => handleRemoveFromCart(product._id)}
                disabled={removeFromCartStatus}
                className="btn cart-remove-button"
              >
                {removeFromCartStatus ? "Removing" : "Remove"}
              </button>
            </div>
            <button
              disabled={product.qty === 1 || decreaseQuantityStatus}
              onClick={() => handleDecreaseQuantity(product._id)}
              className="btn cart-operation-button"
            >
              {decreaseQuantityStatus ? (
                <Spinner />
              ) : (
                <svg
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#4F46E5"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z" />
                </svg>
              )}
            </button>{" "}
            <span className="cart-product-quantity">{product.qty}</span>{" "}
            <button
              disabled={increaseQuantityStatus}
              onClick={() => handleIncreaseQuantity(product._id)}
              className="btn cart-operation-button"
            >
              {" "}
              {increaseQuantityStatus ? (
                <Spinner />
              ) : (
                <svg
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#4F46E5"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="cart-product-price-desktop">
          <p className="text-bold text-lg">₹ {product.price}</p>
          <button
            onClick={() => handleRemoveFromCart(product._id)}
            disabled={removeFromCartStatus}
            className="btn cart-remove-button"
          >
            {removeFromCartStatus ? "Removing" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
