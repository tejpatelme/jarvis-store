import "./App.css";
import { Routes, Route } from "react-router";
import { NavBar, ToastContainer } from "./components";
import {
  Cart,
  Home,
  Wishlist,
  Products,
  Login,
  Signup,
  ProductPage,
} from "./pages";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <div className="App">
      <NavBar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
