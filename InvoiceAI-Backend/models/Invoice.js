import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema(
    {
        filePath: { type: String },
        fileOriginalName: { type: String },
        invoiceNumber: { type: String },
        date: { type: String },
        customerName: { type: String },
        totalAmount: { type: String },
        ocrRaw: { type: mongoose.Schema.Types.Mixed },
        summary: { type: String }, 
    },
    { timestamps: true }
);

export default mongoose.model('Invoice', InvoiceSchema);
