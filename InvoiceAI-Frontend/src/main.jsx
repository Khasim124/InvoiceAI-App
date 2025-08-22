import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";
import { InvoiceProvider } from "./context/InvoiceContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InvoiceProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InvoiceProvider>
  </React.StrictMode>
);
