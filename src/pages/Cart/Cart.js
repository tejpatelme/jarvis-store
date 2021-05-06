import "./Cart.css";
import { useAuth, useToast, useUserData } from "../../contexts";
import axios from "axios";
// import { useEffect } from "react";

export default function Cart() {
  const {
    state: { cart },
    dispatch,
  } = useUserData();
  const { user } = useAuth();
  const { dispatch: toastDispatch } = useToast();

  // useEffect(
  //   () =>
  //     (async () => {
  //       const {
  //         data: { products },
  //         status,
  //       } = await axios.get("http://localhost:3000/cart");
  //       console.log(products);
  //       if (status === 200) {
  //         dispatch({ TYPE: "SET_CART", PAYLOAD: products });
  //       }
  //     })(),
  //   [dispatch]
  // );

  const removeProduct = async (id) => {
    try {
      const {
        status,
      } = await axios.post(
        `https://api-jarvis-store.herokuapp.com/cart/remove-product/${user.cartId}`,
        { productId: id }
      );
      if (status === 200) {
        dispatch({ TYPE: "REMOVE_FROM_CART", PAYLOAD: { id } });
        toastDispatch({
          TYPE: "ERROR",
          PAYLOAD: { message: "Removed product from cart" },
        });
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      const {
        status,
      } = await axios.post(
        `https://api-jarvis-store.herokuapp.com/cart/decrease-product-quantity/${user.cartId}`,
        { productId: id }
      );
      if (status === 200) {
        dispatch({
          TYPE: "DECREASE_QUANTITY",
          PAYLOAD: { id },
        });
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const increaseQuantity = async (id) => {
    try {
      const {
        status,
      } = await axios.post(
        `https://api-jarvis-store.herokuapp.com/cart/increase-product-quantity/${user.cartId}`,
        { productId: id }
      );
      if (status === 200) {
        dispatch({
          TYPE: "INCREASE_QUANTITY",
          PAYLOAD: { id },
        });
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="cart-container">
      <h3 className="mb-3">Cart {cart.length} Items</h3>
      {cart.map((prod) => {
        const { _id, name, brand, price, image } = prod.productId;
        const { qty } = prod;
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
                    onClick={() => decreaseQuantity(_id)}
                    disabled={qty === 1 ? true : false}
                  >
                    –
                  </button>
                  <span className="text-bold">{qty}</span>
                  <button
                    className="btn-cart"
                    onClick={() => increaseQuantity(_id)}
                  >
                    +
                  </button>
                  <button
                    className="btn-cart btn-cart-delete"
                    onClick={() => removeProduct(_id)}
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
