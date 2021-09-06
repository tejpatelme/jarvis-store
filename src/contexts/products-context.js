import { useReducer, useContext, createContext } from "react";

const ProductContext = createContext();

function reducerFunc(prevState, action) {
  const { categoriesSelected, softwaresSelected } = prevState;

  switch (action.type) {
    case "SORT_BY": {
      return {
        ...prevState,
        sortBy: action.payload,
      };
    }

    case "FILTER_BY_CATEGORIES": {
      const categoryAlreadySelected = categoriesSelected.find(
        (category) => category === action.payload.category
      );

      return {
        ...prevState,
        categoriesSelected: categoryAlreadySelected
          ? categoriesSelected.filter(
              (category) => category !== categoryAlreadySelected
            )
          : [...categoriesSelected, action.payload.category],
      };
    }

    case "FILTER_BY_SOFTWARE": {
      const softwareAlreadySelected = softwaresSelected.find(
        (software) => software === action.payload.software
      );

      return {
        ...prevState,
        softwaresSelected: softwareAlreadySelected
          ? softwaresSelected.filter(
              (software) => software !== softwareAlreadySelected
            )
          : [...softwaresSelected, action.payload.software],
      };
    }

    case "RESET_FILTERS": {
      return {
        sortBy: null,
        categoriesSelected: [],
        softwaresSelected: [],
      };
    }

    default:
      return prevState;
  }
}

export default function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, {
    sortBy: null,
    categoriesSelected: [],
    softwaresSelected: [],
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
