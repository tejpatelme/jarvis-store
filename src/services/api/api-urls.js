const BASE_URL = process.env.REACT_APP_API_URL;

const API = {
  BASE_URL: `${BASE_URL}`,
  GET_PRODUCTS: `${BASE_URL}/products`,
  GET_CART: `${BASE_URL}/carts`,
  GET_WISHLIST: `${BASE_URL}/wishlists`,
  ADD_TO_CART: `${BASE_URL}/carts/add-to-cart`,
  INCREASE_PRODUCT_QUANTITY: `${BASE_URL}/carts/increase-product-quantity`,
  DECREASE_PRODUCT_QUANTITY: `${BASE_URL}/carts/decrease-product-quantity`,
  REMOVE_PRODUCT: `${BASE_URL}/carts/remove-product`,
  LOGIN: `${BASE_URL}/users/login`,
  SIGN_UP: `${BASE_URL}/users/signup`,
  CHECKOUT: `${BASE_URL}/carts/checkout`,
};

export default API;
