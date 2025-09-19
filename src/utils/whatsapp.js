import axios from 'axios';

export async function uploadPDFtoWhatsApp({ base64PDF, fileName }) {
  // Convert base64 to Buffer for multipart upload
  const url = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/media`;

  // For Cloud API, sending as 'file' parameter in form-data is expected, use axios with FormData
  const FormData = require('form-data');
  const form = new FormData();
  form.append('file', Buffer.from(base64PDF, 'base64'), {
    filename: fileName,
    contentType: 'application/pdf'
  });
  form.append('type', 'application/pdf');
  form.append('messaging_product', 'whatsapp');

  const res = await axios.post(url, form, {
    headers: {
      'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      ...form.getHeaders()
    }
  });
  return res.data.id; // media_id
}

export async function sendWhatsAppPDF({ recipientPhone, mediaId, fileName, caption }) {
  const url = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  await axios.post(
    url,
    {
      messaging_product: 'whatsapp',
      to: recipientPhone, // e.g., "919876543210"
      type: 'document',
      document: {
        id: mediaId,
        caption,
        filename: fileName
      }
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
}
