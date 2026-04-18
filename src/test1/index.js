import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./Contexts/Cart.contexts";
import { DoctorProvider } from "./Contexts/Doctor.contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <DoctorProvider>
        <App />
      </DoctorProvider>
    </CartProvider>
   </React.StrictMode>
);
reportWebVitals();
