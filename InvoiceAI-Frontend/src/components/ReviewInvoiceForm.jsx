import React, { useState } from "react";

const ReviewInvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: "INV-2025-001",
    date: "2025-08-22",
    customerName: "John Doe",
    totalAmount: "₹25,000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Invoice Saved Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          🧾 Review Invoice
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Invoice Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Invoice Number
            </label>
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Total Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Total Amount
            </label>
            <input
              type="text"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              placeholder="₹0.00"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            💾 Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewInvoiceForm;
