import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchInvoice, updateInvoice } from "../services/invoiceService.js";
import InvoiceForm from "../components/InvoiceForm.jsx";
import Loader from "../components/Loader.jsx";
import { InvoiceContext } from "../context/InvoiceContext.jsx";

const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoice, setInvoice } = useContext(InvoiceContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInvoice = async () => {
      try {
        const data = await fetchInvoice(id);
        setInvoice(data);
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getInvoice();
  }, [id, setInvoice]);

  const handleSave = async (updates) => {
    setLoading(true);
    try {
      const updated = await updateInvoice(id, updates);
      setInvoice(updated);
      navigate(`/summary/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!invoice) return <p className="text-center mt-10">Invoice not found</p>;

  return <InvoiceForm invoice={invoice} onSave={handleSave} />;
};

export default ReviewPage;
