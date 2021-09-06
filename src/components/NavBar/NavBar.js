import "./NavBar.css";
import { useAuth, useUserData } from "../../contexts";
import { Link, useNavigate } from "react-router-dom";
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

  const { getData: getUsersCart } = useAxios(API.GET_CART);
  const { getData: getUsersWishlist } = useAxios(API.GET_WISHLIST);

  const handleClick = (e) => {
    return isLoggedIn ? logout() : navigate("/login");
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
              <svg
                width="117"
                height="32"
                viewBox="0 0 117 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M56.8168 16.4929H60.9432C60.8835 12.8636 57.9006 10.358 53.3665 10.358C48.902 10.358 45.6307 12.8239 45.6506 16.5227C45.6406 19.5256 47.7585 21.2457 51.1989 22.071L53.4162 22.6278C55.6335 23.1648 56.8665 23.8011 56.8764 25.1733C56.8665 26.6648 55.4545 27.679 53.267 27.679C51.0298 27.679 49.419 26.6449 49.2798 24.6065H45.1136C45.223 29.0114 48.375 31.2884 53.3168 31.2884C58.2884 31.2884 61.2116 28.9119 61.2216 25.1832C61.2116 21.7926 58.6562 19.9929 55.1165 19.1974L53.2869 18.7599C51.517 18.3523 50.0355 17.696 50.0653 16.2344C50.0653 14.9219 51.2287 13.9574 53.3366 13.9574C55.3949 13.9574 56.6577 14.892 56.8168 16.4929ZM71.8816 15.7273H69.008V12.0682H64.7722V15.7273H62.6841V18.9091H64.7722V26.8636C64.7523 29.8565 66.7907 31.3381 69.8631 31.2088C70.9569 31.169 71.7324 30.9503 72.16 30.8111L71.4938 27.6591C71.285 27.6989 70.8375 27.7983 70.4398 27.7983C69.5946 27.7983 69.008 27.4801 69.008 26.3068V18.9091H71.8816V15.7273ZM81.0973 31.2983C85.7308 31.2983 88.6144 28.1264 88.6144 23.4233C88.6144 18.6903 85.7308 15.5284 81.0973 15.5284C76.4638 15.5284 73.5803 18.6903 73.5803 23.4233C73.5803 28.1264 76.4638 31.2983 81.0973 31.2983ZM81.1172 28.017C78.9794 28.017 77.8857 26.0582 77.8857 23.3935C77.8857 20.7287 78.9794 18.7599 81.1172 18.7599C83.2152 18.7599 84.309 20.7287 84.309 23.3935C84.309 26.0582 83.2152 28.017 81.1172 28.017ZM91.0886 31H95.3244V22.3594C95.3244 20.4801 96.6966 19.1875 98.5659 19.1875C99.1525 19.1875 99.9579 19.2869 100.356 19.4162V15.6577C99.9778 15.5682 99.4508 15.5085 99.0233 15.5085C97.3131 15.5085 95.9111 16.5028 95.3542 18.392H95.1952V15.7273H91.0886V31ZM108.515 31.2983C112.293 31.2983 114.839 29.4588 115.435 26.625L111.518 26.3665C111.09 27.5298 109.996 28.1364 108.585 28.1364C106.467 28.1364 105.124 26.7344 105.124 24.4574V24.4474H115.525V23.2841C115.525 18.0938 112.383 15.5284 108.346 15.5284C103.852 15.5284 100.938 18.7202 100.938 23.4332C100.938 28.2756 103.812 31.2983 108.515 31.2983ZM105.124 21.8224C105.214 20.0824 106.536 18.6903 108.416 18.6903C110.255 18.6903 111.528 20.0028 111.538 21.8224H105.124Z"
                  fill="#3C4043"
                />
                <path
                  d="M32.5476 36H3.53244C3.22867 36 2.93945 35.8712 2.73621 35.6454C2.53296 35.4199 2.43518 35.1186 2.46677 34.8168L5.20291 8.76077C5.26031 8.2153 5.72009 7.80112 6.26858 7.80112H29.8115C30.3597 7.80112 30.8197 8.2153 30.8769 8.76077L33.613 34.8168C33.6449 35.1186 33.5468 35.4199 33.3438 35.6454C33.1403 35.8712 32.8511 36 32.5476 36Z"
                  fill="#AF8EF9"
                />
                <path
                  d="M30.8768 8.76077C30.8197 8.2153 30.3596 7.80112 29.8114 7.80112H18.0396V36H32.5475C32.851 36 33.1405 35.8712 33.3435 35.6454C33.5468 35.4199 33.6448 35.1186 33.6129 34.8168L30.8768 8.76077Z"
                  fill="#8B5CF6"
                />
                <path
                  d="M23.5973 13.3764C23.0054 13.3764 22.5258 12.8969 22.5258 12.305V6.6286C22.5258 4.1553 20.5134 2.14288 18.0399 2.14288C15.5663 2.14288 13.5541 4.1553 13.5541 6.6286V12.3052C13.5541 12.8969 13.0743 13.3767 12.4827 13.3767C11.8908 13.3767 11.4113 12.8969 11.4113 12.3052V6.6286C11.4113 2.97372 14.3847 0 18.0399 0C21.695 0 24.6687 2.97372 24.6687 6.6286V12.3052C24.6687 12.8969 24.1889 13.3764 23.5973 13.3764V13.3764Z"
                  fill="#555A66"
                />
                <path
                  d="M18.0398 0C18.0398 0 18.0398 0 18.0396 0V2.14288H18.0398C20.5134 2.14288 22.5258 4.1553 22.5258 6.6286V12.3052C22.5258 12.8969 23.0054 13.3767 23.5973 13.3767C24.1889 13.3767 24.6687 12.8969 24.6687 12.3052V6.6286C24.6687 2.97372 21.695 0 18.0398 0Z"
                  fill="#23272B"
                />
              </svg>
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
