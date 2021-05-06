import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const GetProductsContext = createContext();

export default function GetProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const {
        data: { products },
      } = await axios.get("https://api-jarvis-store.herokuapp.com/products");
      setProducts(products);
    })();
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
