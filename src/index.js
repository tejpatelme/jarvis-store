import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  GetProductsProvider,
  ProductProvider,
  ToastProvider,
  UserDataProvider,
  AuthProvider,
} from "./contexts";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <GetProductsProvider>
        <ProductProvider>
          <UserDataProvider>
            <ToastProvider>
              <Router>
                <App />
              </Router>
            </ToastProvider>
          </UserDataProvider>
        </ProductProvider>
      </GetProductsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
