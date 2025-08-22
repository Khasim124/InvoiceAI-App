import React from "react";
import ReviewInvoiceForm from "../components/ReviewInvoiceForm";

const ReviewInvoicePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wide">InvoiceAI</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="hover:text-yellow-300 transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-yellow-300 transition duration-200"
              >
                Invoices
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-yellow-300 transition duration-200"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <ReviewInvoiceForm />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-sm text-center py-4 border-t">
        © {new Date().getFullYear()} InvoiceAI — All Rights Reserved
      </footer>
    </div>
  );
};

export default ReviewInvoicePage;
