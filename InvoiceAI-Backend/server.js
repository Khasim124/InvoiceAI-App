import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import summaryRoutes from './routes/summaryRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = (process.env.CLIENT_ORIGIN || '').split(',').map(o => o.trim());

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error(`CORS blocked for origin: ${origin}`));
        }
    },
    credentials: true,
}));

app.use(morgan('dev'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, process.env.UPLOAD_DIR || 'uploads');
app.use('/uploads', express.static(uploadsDir));

app.get('/', (_req, res) => res.json({ ok: true, service: 'invoiceai-backend' }));

app.use('/api/invoices', invoiceRoutes);
app.use('/api/summary', summaryRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend listening on port ${PORT}`));
