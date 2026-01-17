import axios from 'axios';

// const BOT_TOKEN = '8021765963:AAE6fEJVY4ILfM0q9VJyCJnO_FM_NO0dNk0';
// const CHAT_ID = '5900380633';

const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN;
const CHAT_ID = process.env.REACT_APP_CHAT_ID;

export const sendToTelegram = async (data, type = 'cart_checkout') => {
 try {
   let message = '';
   
   if (type === 'cart_checkout') {
     message = `
🛒 *CHECKOUT INITIATED*

*Customer Information:*
• Name: ${data.customerName || 'Guest Customer'}
• Items in Cart: ${data.itemCount || 0}
• Cart Total: $${data.total?.toFixed(2) || '0.00'}
• Estimated Shipping: $${data.shippingCost?.toFixed(2) || '0.00'}
• Estimated Tax: $${data.tax?.toFixed(2) || '0.00'}
• Estimated Order Total: $${data.orderTotal?.toFixed(2) || '0.00'}

*Cart Items:*
${data.items?.map(item => `• ${item.quantity}x ${item.name} - $${item.price.toFixed(2)} each`).join('\n') || 'No items in cart'}

*Time:* ${new Date().toLocaleString()}
*Reference:* ${data.orderId || 'N/A'}

User is now proceeding to the checkout page.
     `;
   } 
   else if (type === 'order_placed') {
     message = `
🎉 *NEW ORDER RECEIVED!*

*Order Details:*
• Order ID: ${data.orderId}
• Customer: ${data.customer.firstName} ${data.customer.lastName}
• Email: ${data.customer.email}
• Phone: ${data.customer.phone}
• Address: ${data.customer.address}

*Order Items:*
${data.items.map(item => `• ${item.quantity}x ${item.name} (${item.category}) - $${item.price.toFixed(2)} each = $${item.total}`).join('\n')}

*Payment Information:*
• Card Type: ${data.payment.cardType}
• Last 4 Digits: ${data.payment.lastFour}
• Name on Card: ${data.payment.nameOnCard}
• Expiry: ${data.payment.expiry}

*Order Summary:*
• Subtotal: $${data.totals.subtotal.toFixed(2)}
• Shipping: ${data.shipping}
• Tax: $${data.totals.tax.toFixed(2)}
• *TOTAL: $${data.totals.total.toFixed(2)}*

*Special Instructions:*
${data.specialInstructions}

*Time:* ${new Date().toLocaleString()}
*Status:* 📦 Ready for Processing

📍 *Shipping Address:*
${data.customer.address}

Please process this order immediately! 🚀
     `;
   }

   const response = await axios.post(
     `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
     {
       chat_id: CHAT_ID,
       text: message,
       parse_mode: 'Markdown',
     },
     {
       timeout: 5000
     }
   );

   console.log('Telegram message sent successfully:', response.data);
   return response.data;
 } catch (error) {
   console.error('Error sending to Telegram:', error);
   return null;
 }
};

export const sendTestMessage = async () => {
 try {
   const response = await axios.post(
     `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
     {
       chat_id: CHAT_ID,
       text: '✅ Skincare E-commerce Bot is online and ready to receive orders!\n\nBot Status: Active\nLast Check: ' + new Date().toLocaleString(),
       parse_mode: 'Markdown',
     }
   );
   return response.data;
 } catch (error) {
   console.error('Test message failed:', error);
   return null;
 }
};

// Add this new function for contact form
export const sendContactFormToTelegram = async (formData) => {
 try {
   const message = `
📨 *NEW CONTACT FORM SUBMISSION*

*Customer Details:*
• Name: ${formData.name}
• Email: ${formData.email}
• Contact Preference: ${formData.contactMethod.toUpperCase()}

*Subject:* ${formData.subject}

*Message:*
${formData.message}

*Time:* ${new Date().toLocaleString()}
*Status:* 📧 Needs Response

Please respond to this inquiry within 24 hours.
   `;

   const response = await axios.post(
     `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
     {
       chat_id: CHAT_ID,
       text: message,
       parse_mode: 'Markdown',
     },
     {
       timeout: 5000
     }
   );

   console.log('Contact form sent to Telegram:', response.data);
   return response.data;
 } catch (error) {
   console.error('Error sending contact form to Telegram:', error);
   return null;
 }
};