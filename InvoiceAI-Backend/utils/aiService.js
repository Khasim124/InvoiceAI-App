import axios from 'axios';

export async function generateSummary({ invoiceNumber, date, customerName, totalAmount }) {
    const apiKey = process.env.COHERE_API_KEY;
    if (!apiKey) throw new Error('Missing COHERE_API_KEY');

    const prompt = `Write a single concise sentence summarizing this invoice for a non-technical user. Use Indian Rupee symbol if appropriate.\n\nInvoice Number: ${invoiceNumber || '—'}\nDate: ${date || '—'}\nCustomer Name: ${customerName || '—'}\nTotal Amount: ${totalAmount || '—'}\n\nExample format: "Invoice INV-2025 dated 10 Aug 2025 for John Doe totals ₹15,000." Only output the sentence.`;

    const resp = await axios.post(
        'https://api.cohere.ai/v1/generate',
        {
            model: 'command-r-plus',
            prompt,
            max_tokens: 60,
            temperature: 0.3,
        },
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        }
    );

    const text = resp.data?.generations?.[0]?.text?.trim() || '';
    return text.replace(/^"|"$/g, '');
}
