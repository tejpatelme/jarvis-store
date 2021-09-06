import { useContext, createContext, useReducer } from "react";

const UserDataContext = createContext();

function reducerFunc(prevState, action) {
  const { cart, wishlist } = prevState;
  // const { id } = action.payload;

  switch (action.type) {
    case "SET_CART": {
      const products = action.payload.products.map((product) => ({
        ...product.productId,
        qty: product.qty,
      }));

      return { cart: products, wishlist };
    }

    case "SET_WISHLIST": {
      const tempWishlist = [...action.payload.products];
      return { cart, wishlist: tempWishlist };
    }

    case "ADD_TO_CART": {
      const newArr = cart.concat({ ...action.payload.product, qty: 1 });

      return { cart: newArr, wishlist };
    }

    case "HANDLE_WISHLIST": {
      const match = wishlist.find(
        (product) => product._id === action.payload.product._id
      );

      const newArr = match
        ? wishlist.filter(
            (product) => product._id !== action.payload.product._id
          )
        : wishlist.concat(action.payload.product);

      return { cart, wishlist: newArr };
    }

    case "INCREASE_QUANTITY": {
      const newArr = cart.map((product) => {
        return product._id === action.payload.product._id
          ? {
              ...product,
              qty: product.qty + 1,
            }
          : product;
      });

      return { cart: newArr, wishlist };
    }

    case "DECREASE_QUANTITY": {
      const newArr = cart.map((product) => {
        return product._id === action.payload.product._id
          ? {
              ...product,
              qty: product.qty - 1,
            }
          : product;
      });

      return { cart: newArr, wishlist };
    }

    case "REMOVE_FROM_CART": {
      const newArr = cart.filter(
        (product) => product._id !== action.payload.product._id
      );

      return { cart: newArr, wishlist };
    }

    default:
      return prevState;
  }
}

export default function UserDataProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, { cart: [], wishlist: [] });
  return (
    <UserDataContext.Provider value={{ state, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}
