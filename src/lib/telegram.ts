const TELEGRAM_BOT_TOKEN = '8538901249:AAF-Ya8My1sQ2ikHgKAWeX_V2RlbZfuwoe0';
const TELEGRAM_CHAT_ID = '6130097075';

const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
const TELEGRAM_DOCUMENT_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;
const TELEGRAM_PHOTO_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;

export interface TelegramMessage {
  text: string;
}

export async function sendTelegramMessage(message: string): Promise<boolean> {
  try {
    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();
    
    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', data);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}

export async function sendTelegramFiles(files: FileList): Promise<boolean> {
  if (!files || files.length === 0) {
    return true; // No files to send is not an error
  }

  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: file.type });
      const formData = new FormData();
      
      formData.append('chat_id', TELEGRAM_CHAT_ID);
      formData.append('document', blob, file.name);
      formData.append('caption', `📎 Evidence: ${file.name}`);

      let apiUrl = TELEGRAM_DOCUMENT_API_URL;
      
      // Use photo API for image files
      if (file.type.startsWith('image/')) {
        apiUrl = TELEGRAM_PHOTO_API_URL;
        formData.set('photo', blob, file.name);
        formData.delete('document');
      }

      console.log(`Sending file: ${file.name} (${file.type})`);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok || !data.ok) {
        console.error('Telegram file upload error for file:', file.name, data);
        // Continue with other files even if one fails
        continue;
      }
      
      console.log('File sent successfully:', file.name);
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram files:', error);
    return false;
  }
}

export function formatContactFormMessage(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
<b>📧 New Contact Form Submission</b>

<b>Name:</b> ${formData.name}
<b>Email:</b> ${formData.email}
<b>Subject:</b> ${formData.subject}

<b>Message:</b>
${formData.message}
  `.trim();
}

export function formatSubmitCaseMessage(formData: {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  scamType: string;
  amountLost: string;
  transactionDetails: string;
  consent: boolean;
  files?: FileList | null;
}): string {
  const scamTypeMap: Record<string, string> = {
    'crypto': '🪙 Cryptocurrency Scam',
    'p2p': '💱 P2P Trading Scam',
    'bank': '🏦 Bank Transfer Fraud',
    'investment': '📈 Investment Fraud',
    'romance': '💔 Romance Scam',
    'other': '📋 Other'
  };

  return `
╔════════════════════════════════════════╗
║      🛡️ NEW CASE SUBMISSION            ║
╚════════════════════════════════════════╝

👤 PERSONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Country: ${formData.country}
City: ${formData.city}

📋 CASE DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scam Type: ${scamTypeMap[formData.scamType] || formData.scamType}
Amount Lost: $${formData.amountLost} USD

💬 TRANSACTION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.transactionDetails}

📁 EVIDENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.files && formData.files.length > 0 ? `${formData.files.length} file(s) attached` : 'No files attached'}

✅ CONSENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.consent ? '✅ Terms accepted' : '❌ Terms not accepted'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
}

