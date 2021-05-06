import { useReducer, useContext, createContext } from "react";

const ProductContext = createContext();

function reducerFunc(prevState, action) {
  switch (action.TYPE) {
    case "SHOW_ONLY_IN_STOCK": {
      return {
        ...prevState,
        showOnlyInStock: !prevState.showOnlyInStock,
      };
    }

    case "SHOW_ONLY_FAST_DELIVERY": {
      return {
        ...prevState,
        showOnlyFastDelivery: !prevState.showOnlyFastDelivery,
      };
    }

    case "SORT_BY": {
      return {
        ...prevState,
        sortBy: action.PAYLOAD,
      };
    }
    default:
      return prevState;
  }
}

export default function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, {
    showOnlyInStock: false,
    showOnlyFastDelivery: false,
    sortBy: null,
  });
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
