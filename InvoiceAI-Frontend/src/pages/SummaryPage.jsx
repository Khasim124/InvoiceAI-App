import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { generateSummary, fetchInvoice } from "../services/invoiceService.js";
import Loader from "../components/Loader.jsx";
import { InvoiceContext } from "../context/InvoiceContext.jsx";
import { formatDate } from "../utils/formatDate.js";

const SummaryPage = () => {
  const { id } = useParams();
  const { invoice, setInvoice } = useContext(InvoiceContext);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSummary = async () => {
      setLoading(true);
      try {
        let inv = invoice;
        if (!invoice) {
          inv = await fetchInvoice(id);
          setInvoice(inv);
        }

        if (inv.summary) {
          setSummary(inv.summary);
        } else {
          const text = await generateSummary(id);
          setSummary(text);
        }
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getSummary();
  }, [id, invoice, setInvoice]);

  if (loading) return <Loader />;
  if (!invoice)
    return <p className="text-center mt-10 text-red-500">Invoice not found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow rounded space-y-6">
      <h2 className="text-2xl font-bold mb-2">Invoice Summary</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Invoice Number:</span>{" "}
          {invoice.invoiceNumber || "—"}
        </p>
        <p>
          <span className="font-medium">Date:</span>{" "}
          {invoice.date ? formatDate(invoice.date) : "—"}
        </p>
        <p>
          <span className="font-medium">Customer Name:</span>{" "}
          {invoice.customerName || "—"}
        </p>
        <p>
          <span className="font-medium">Total Amount:</span>{" "}
          {invoice.totalAmount
            ? `₹${invoice.totalAmount.replace(/[^0-9.]/g, "")}`
            : "—"}
        </p>
      </div>
      <div className="mt-4 p-4 bg-gray-50 border rounded">
        <h3 className="font-semibold mb-2">AI Generated Summary:</h3>
        <p className="text-gray-700">{summary || "Summary not available."}</p>
      </div>
    </div>
  );
};

export default SummaryPage;
