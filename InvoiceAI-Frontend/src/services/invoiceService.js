import api from './api';

export const uploadInvoice = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/invoices/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
};

export const updateInvoice = async (id, updates) => {
    const response = await api.put(`/invoices/${id}`, updates);
    return response.data.data;
};

export const fetchInvoice = async (id) => {
    const response = await api.get(`/invoices/${id}`);
    return response.data.data;
};

export const generateSummary = async (invoiceId) => {
    const response = await api.post('/summary', { invoiceId });
    return response.data.summary;
};
