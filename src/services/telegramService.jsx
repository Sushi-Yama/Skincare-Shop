import axios from 'axios';

// Test with hardcoded values first (remove later)
const BOT_TOKEN = '8021765963:AAE6fEJVY4ILfM0q9VJyCJnO_FM_NO0dNk0';
const CHAT_ID = '5900380633';

// Or use environment variables if set
// const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN || '8021765963:AAE6fEJVY4ILfM0q9VJyCJnO_FM_NO0dNk0';
// const CHAT_ID = process.env.REACT_APP_CHAT_ID || '5900380633';

export const sendToTelegram = async (data, type = 'cart_checkout') => {
  console.log('Attempting to send to Telegram...');
  console.log('BOT_TOKEN exists:', !!BOT_TOKEN);
  console.log('CHAT_ID:', CHAT_ID);
  
  try {
    // First, test if we can reach Telegram API
    console.log('Testing Telegram API connection...');
    
    const testUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getMe`;
    const testResponse = await axios.get(testUrl, { timeout: 5000 });
    console.log('Bot info:', testResponse.data);
    
    if (!testResponse.data.ok) {
      throw new Error('Bot token is invalid');
    }
    
    // Now send the message
    let message = '';
    
    if (type === 'cart_checkout') {
      message = `🛒 CHECKOUT INITIATED\n\nCustomer: ${data.customerName || 'Guest'}\nItems: ${data.itemCount || 0}\nTotal: $${data.total?.toFixed(2) || '0.00'}\n\nTime: ${new Date().toLocaleString()}`;
    } 
    else if (type === 'order_placed') {
      message = `🎉 NEW ORDER!\n\nOrder ID: ${data.orderId}\nCustomer: ${data.customer.firstName} ${data.customer.lastName}\nEmail: ${data.customer.email}\nTotal: $${data.totals.total.toFixed(2)}\n\nTime: ${new Date().toLocaleString()}`;
    }

    console.log('Sending message:', message);
    
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML', // Changed from Markdown to HTML for simplicity
      },
      {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Telegram response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('❌ Telegram error details:');
    console.error('Error message:', error.message);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    console.error('Full error:', error);
    
    // Try alternative CORS proxy if direct API fails
    try {
      console.log('Trying alternative method...');
      const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const proxyResponse = await axios.post(proxyUrl, {
        chat_id: CHAT_ID,
        text: 'Test message via proxy',
      });
      console.log('Proxy response:', proxyResponse.data);
    } catch (proxyError) {
      console.error('Proxy also failed:', proxyError.message);
    }
    
    return null;
  }
};

export const sendTestMessage = async () => {
  console.log('Sending test message...');
  return sendToTelegram({ 
    customerName: 'Test User', 
    itemCount: 1, 
    total: 99.99 
  }, 'cart_checkout');
};

export const sendContactFormToTelegram = async (formData) => {
  const message = `📨 NEW CONTACT FORM\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}\n\nTime: ${new Date().toLocaleString()}`;
  
  return sendToTelegram({ 
    customerName: formData.name,
    itemCount: 0,
    total: 0
  }, 'cart_checkout'); // Reusing the same function
};