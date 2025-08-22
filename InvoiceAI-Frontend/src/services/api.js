import axios from 'axios';

const api = axios.create({
    baseURL: 'https://invoiceai-app.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
