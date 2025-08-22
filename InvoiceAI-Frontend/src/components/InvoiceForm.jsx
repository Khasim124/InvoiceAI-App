import React, { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate.js";

const InvoiceForm = ({ invoice, onSave }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    date: "",
    customerName: "",
    totalAmount: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (invoice) {
      setFormData({
        invoiceNumber: invoice.invoiceNumber || "",
        date: invoice.date ? formatDate(invoice.date) : "",
        customerName: invoice.customerName || "",
        totalAmount: invoice.totalAmount || "",
      });
    }
  }, [invoice]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.invoiceNumber.trim()) newErrors.invoiceNumber = "Required";
    if (!formData.date.trim()) newErrors.date = "Required";
    if (!formData.customerName.trim()) newErrors.customerName = "Required";
    if (!formData.totalAmount.trim()) newErrors.totalAmount = "Required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Review Invoice</h2>

      {["invoiceNumber", "date", "customerName", "totalAmount"].map((field) => (
        <div key={field} className="flex flex-col">
          <label className="font-medium mb-1">
            {field.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
              errors[field]
                ? "border-red-500 ring-red-200"
                : "border-gray-300 ring-blue-200"
            }`}
          />
          {errors[field] && (
            <span className="text-red-500 text-sm mt-1">{errors[field]}</span>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Save & Continue
      </button>
    </form>
  );
};

export default InvoiceForm;
