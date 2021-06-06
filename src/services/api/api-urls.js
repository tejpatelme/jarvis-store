const API = {
  BASE_URL: "http://localhost:3000",
  GET_PRODUCTS: "http://localhost:3000/products",
  GET_CART: "http://localhost:3000/carts",
  GET_WISHLIST: "http://localhost:3000/wishlists",
  ADD_TO_CART: "http://localhost:3000/carts/add-to-cart",
  INCREASE_PRODUCT_QUANTITY:
    "http://localhost:3000/carts/increase-product-quantity",
  DECREASE_PRODUCT_QUANTITY:
    "http://localhost:3000/carts/decrease-product-quantity",
  LOGIN: "http://localhost:3000/users/login",
  SIGN_UP: "http://localhost:3000/users/signup",
};

export default API;
