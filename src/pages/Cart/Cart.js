import "./Cart.css";
import { useToast, useUserData } from "../../contexts";
import useAxios from "../../hooks/useAxios";
import API from "../../services/api/api-urls";

export default function Cart() {
  const {
    state: { cart },
    dispatch,
  } = useUserData();
  const { dispatch: toastDispatch } = useToast();
  const { postData: removeFromCart } = useAxios(API.REMOVE_PRODUCT);
  const { postData: DecreaseQuantity } = useAxios(
    API.DECREASE_PRODUCT_QUANTITY
  );
  const { postData: IncreaseQuantity } = useAxios(
    API.INCREASE_PRODUCT_QUANTITY
  );

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
    <div className="cart-container">
      <h3 className="mb-3">Cart {cart.length} Items</h3>
      {cart.map((product) => {
        const { _id, name, brand, price, image, qty } = product;

        return (
          <div key={_id} className="cart-items-container">
            <div className="cart-card flex shadow-sm">
              <div style={{ width: "150px", height: "150px" }}>
                <img width="100%" height="100%" src={image} alt="product" />
              </div>
              <div className="cart-details flex flex-col justify-between">
                <div>
                  <p className="text-base text-semibold mb-2">{brand}</p>
                  <p className="mb-2">{name}</p>
                  <p className="text-bold">Rs. {price}</p>
                </div>
                <div className="cart-item-operations">
                  <button
                    className="btn-cart"
                    onClick={() => handleDecreaseQuantity(_id)}
                    disabled={qty === 1 ? true : false}
                  >
                    –
                  </button>
                  <span className="text-bold">{qty}</span>
                  <button
                    className="btn-cart"
                    onClick={() => handleIncreaseQuantity(_id)}
                  >
                    +
                  </button>
                  <button
                    className="btn-cart btn-cart-delete"
                    onClick={() => handleRemoveFromCart(_id)}
                  >
                    <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24">
                      <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
