import Invoice from '../models/Invoice.js';
import { processOCR } from '../utils/ocrService.js';

export const uploadInvoice = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { path: filePath, originalname } = req.file;
        const ocrResult = await processOCR(filePath);
        const { raw, ...mappedFields } = ocrResult;

        const invoice = await Invoice.create({
            filePath,
            fileOriginalName: originalname,
            ...mappedFields,
            ocrRaw: raw,
        });

        res.status(201).json({
            success: true,
            message: 'Invoice uploaded & OCR processed',
            data: invoice,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

export const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const allowed = ['invoiceNumber', 'date', 'customerName', 'totalAmount'];
        const updates = {};

        for (const k of allowed) {
            if (req.body[k] !== undefined && req.body[k] !== '') {
                updates[k] = req.body[k];
            }
        }

        const invoice = await Invoice.findByIdAndUpdate(id, updates, { new: true });
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.json({ success: true, message: 'Invoice updated', data: invoice });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json({ success: true, data: invoice });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 });
        res.json({ success: true, count: invoices.length, data: invoices });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json({ success: true, message: 'Invoice deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
