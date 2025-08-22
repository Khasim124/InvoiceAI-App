import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

export const processOCR = async (filePath) => {
    try {
        const apiKey = process.env.OCR_SPACE_API_KEY;
        if (!apiKey || apiKey === 'your_ocr_space_key') {
            throw new Error('OCR_SPACE_API_KEY is missing or invalid in your .env');
        }

        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        const response = await axios.post(
            'https://api.ocr.space/parse/image',
            formData,
            {
                headers: {
                    apikey: apiKey,
                    ...formData.getHeaders(),
                },
            }
        );

        if (response.data?.IsErroredOnProcessing) {
            throw new Error(response.data?.ErrorMessage?.[0] || 'Unknown OCR.Space error');
        }

        const parsedText = response.data?.ParsedResults?.[0]?.ParsedText || '';

        return {
            invoiceNumber: parsedText.match(/Invoice\s*#\s*(\S+)/i)?.[1] || '',
            date: parsedText.match(/Date[:\s]+([\d-\/]+)/i)?.[1] || '',
            customerName: parsedText.match(/Customer[:\s]+(.+)/i)?.[1] || '',
            totalAmount: parsedText.match(/Total[:\s]+([\d.,]+)/i)?.[1] || '',
            raw: parsedText,
        };
    } catch (err) {
        if (err.response && err.response.status === 403) {
            throw new Error('OCR failed: Invalid API key or forbidden request (403)');
        }
        throw new Error(`OCR failed: ${err.message}`);
    }
};
