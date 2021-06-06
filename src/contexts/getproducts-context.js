import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api/api-urls";
import useAxios from "../hooks/useAxios";

const GetProductsContext = createContext();

export default function GetProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const { getData } = useAxios(API.GET_PRODUCTS);

  useEffect(() => {
    (async () => {
      const data = await getData();

      setProducts(data.products);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GetProductsContext.Provider value={{ products }}>
      {children}
    </GetProductsContext.Provider>
  );
}

export function useGetProducts() {
  return useContext(GetProductsContext);
}
