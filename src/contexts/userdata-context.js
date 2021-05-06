import { useContext, createContext, useReducer } from "react";

const UserDataContext = createContext();

function reducerFunc(prevState, action) {
  const { cart, wishlist } = prevState;
  const { id } = action.PAYLOAD;

  switch (action.TYPE) {
    case "SET_CART": {
      const tempCart = [...action.PAYLOAD];
      return { cart: tempCart, wishlist };
    }

    case "SET_WISHLIST": {
      const tempWishlist = [...action.PAYLOAD];
      return { cart, wishlist: tempWishlist };
    }
    case "ADD_TO_CART": {
      const match = cart.find((prod) => prod.id === id);
      if (match) {
        const newArr = cart.map((prod) =>
          prod.id === id ? { ...prod, quantity: prod.quantity + 1 } : prod
        );
        return { cart: newArr, wishlist };
      }
      const newArr = cart.concat({ ...action.PAYLOAD, quantity: 1 });
      return { cart: newArr, wishlist };
    }

    case "INCREASE_QUANTITY": {
      const newArr = cart.map((prod) =>
        prod.productId._id === id ? { ...prod, qty: prod.qty + 1 } : prod
      );
      return { cart: newArr, wishlist };
    }

    case "DECREASE_QUANTITY": {
      const newArr = cart.map((prod) =>
        prod.productId._id === id ? { ...prod, qty: prod.qty - 1 } : prod
      );
      return { cart: newArr, wishlist };
    }

    case "REMOVE_FROM_CART": {
      const newArr = cart.filter((prod) => prod.productId._id !== id);
      return { cart: newArr, wishlist };
    }

    case "ADD_TO_WISHLIST": {
      const newArr = wishlist.concat(action.PAYLOAD);
      return { cart, wishlist: newArr };
    }

    case "REMOVE_FROM_WISHLIST": {
      const newArr = wishlist.filter((prod) => prod._id !== action.PAYLOAD);
      return { cart, wishlist: newArr };
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
