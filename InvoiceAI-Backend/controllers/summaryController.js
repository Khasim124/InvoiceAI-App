import Invoice from '../models/Invoice.js';
import { generateSummary } from '../utils/aiService.js';

export const summarizeById = async (req, res) => {
    try {
        const { invoiceId } = req.body;
        if (!invoiceId) return res.status(400).json({ message: 'invoiceId is required' });

        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

        if (!invoice.summary) {
            const cleanAmount = invoice.totalAmount
                ? invoice.totalAmount.replace(/[^0-9.]/g, '')
                : '0';

            const summaryText = await generateSummary({
                invoiceNumber: invoice.invoiceNumber,
                date: invoice.date,
                customerName: invoice.customerName,
                totalAmount: cleanAmount,
            });

            invoice.summary = summaryText;
            await invoice.save();
        }

        res.json({ summary: invoice.summary });
    } catch (err) {
        console.error('Error generating summary:', err.message);
        res.status(500).json({ message: 'Failed to generate summary', error: err.message });
    }
};
