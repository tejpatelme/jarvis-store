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
    <ToastProvider>
      <AuthProvider>
        <GetProductsProvider>
          <ProductProvider>
            <UserDataProvider>
              <Router>
                <App />
              </Router>
            </UserDataProvider>
          </ProductProvider>
        </GetProductsProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
