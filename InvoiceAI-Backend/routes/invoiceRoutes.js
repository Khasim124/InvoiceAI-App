import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import {
    uploadInvoice,
    updateInvoice,
    getInvoice,
    getInvoices,
    deleteInvoice,
} from '../controllers/invoiceController.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadInvoice);
router.put('/:id', updateInvoice);
router.get('/:id', getInvoice);
router.get('/', getInvoices);
router.delete('/:id', deleteInvoice);

export default router;
