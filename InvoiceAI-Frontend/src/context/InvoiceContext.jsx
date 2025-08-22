import React, { createContext, useState } from "react";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoice, setInvoice] = useState(null);

  return (
    <InvoiceContext.Provider value={{ invoice, setInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};
