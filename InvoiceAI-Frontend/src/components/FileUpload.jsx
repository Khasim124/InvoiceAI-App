import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadInvoice } from "../services/invoiceService.js";
import Loader from "./Loader.jsx";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");
    setLoading(true);
    try {
      const invoice = await uploadInvoice(file);
      navigate(`/review/${invoice._id}`);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Upload Invoice</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
        accept=".pdf,.jpg,.jpeg,.png"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? <Loader /> : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;
