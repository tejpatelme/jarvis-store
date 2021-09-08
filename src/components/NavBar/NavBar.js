import "./NavBar.css";
import logo from "../../assests/logo.svg";
import { useAuth, useUserData } from "../../contexts";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import API from "../../services/api/api-urls";

export default function NavBar() {
  const {
    state: { cart, wishlist },
    dispatch,
  } = useUserData();

  const {
    userLogin: { isLoggedIn },
    logout,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { getData: getUsersCart } = useAxios(API.GET_CART);
  const { getData: getUsersWishlist } = useAxios(API.GET_WISHLIST);

  const handleClick = (e) => {
    return isLoggedIn
      ? logout()
      : navigate("/login", { state: { from: location.pathname } });
  };

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        const cartData = await getUsersCart();
        const wishlistData = await getUsersWishlist();

        cartData?.cart?.products &&
          dispatch({
            type: "SET_CART",
            payload: { products: cartData?.cart?.products },
          });

        wishlistData?.wishlist?.products &&
          dispatch({
            type: "SET_WISHLIST",
            payload: {
              products: wishlistData?.wishlist?.products,
            },
          });
      } else {
        dispatch({ type: "SET_CART", payload: { products: [] } });
        dispatch({ type: "SET_WISHLIST", payload: { products: [] } });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <header className="top-navigation">
      <div className="nav-container">
        <div className="logo">
          <div>
            <Link to="/">
              <img src={logo} alt="app-logo" />
            </Link>
          </div>
        </div>
        {/* <input type="text" placeholder="search items" onChange={handleSearch} /> */}
        <div className="nav-links">
          <ul>
            <li>
              <button onClick={handleClick} className="btn btn-sm btn-primary">
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </li>
            <li>
              <Link to="/wishlist">
                <div className="badge-icon">
                  <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
                    <path
                      d="M12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  {wishlist.length > 0 && (
                    <div className="badge badge-dot-number badge-primary">
                      {wishlist.length}
                    </div>
                  )}
                </div>
              </Link>
            </li>

            <li>
              <Link to="/cart">
                <div className="badge-icon">
                  <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
                    <path
                      d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5H16z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  {cart.length > 0 && (
                    <div className="badge badge-dot-number badge-primary">
                      {cart.length}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
