// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';

export interface TelegramMessage {
  name: string;
  phone: string;
  message: string;
  timestamp: string;
  source: string;
  orderId?: string;
}

export interface TelegramOrderStatus {
  orderId: string;
  status: 'new' | 'viewed';
  timestamp: string;
}

export const TelegramService = {
  // Send message to Telegram
  sendMessage: async (messageData: TelegramMessage): Promise<boolean> => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram bot token or chat ID not configured');
      return false;
    }

    try {
      const text = formatTelegramMessage(messageData);
      
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
      }

      const result = await response.json();
      return result.ok === true;
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      return false;
    }
  },

  // Send message using webhook (alternative method)
  sendMessageWebhook: async (messageData: TelegramMessage): Promise<boolean> => {
    try {
      const webhookUrl = import.meta.env.VITE_TELEGRAM_WEBHOOK_URL;
      
      if (!webhookUrl) {
        console.error('Telegram webhook URL not configured');
        return false;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to send Telegram message via webhook:', error);
      return false;
    }
  },

  // Update order status in Telegram
  updateOrderStatus: async (statusData: TelegramOrderStatus): Promise<boolean> => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram bot token or chat ID not configured');
      return false;
    }

    try {
      const text = formatStatusUpdateMessage(statusData);
      
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
      }

      const result = await response.json();
      return result.ok === true;
    } catch (error) {
      console.error('Failed to update order status in Telegram:', error);
      return false;
    }
  }
};

// Format message for Telegram
function formatTelegramMessage(data: TelegramMessage): string {
  const emoji = '🆕';
  const date = new Date(data.timestamp).toLocaleString('ru-RU', {
    timeZone: 'Europe/Minsk',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  let messageText = data.message;
  
  // Если есть данные калькулятора, добавляем их в красиво оформленном виде
  if (data.message.includes('📋 Детали заказа из калькулятора:')) {
    messageText = data.message.replace(
      '📋 Детали заказа из калькулятора:',
      '\n\n📋 <b>Детали заказа из калькулятора:</b>'
    );
  }

  const orderIdText = data.orderId ? `\n🆔 <b>ID заявки:</b> <code>${data.orderId}</code>` : '';
  
  return `${emoji} <b>Новая заявка с сайта!</b>${orderIdText}

👤 <b>Имя:</b> ${data.name}
📱 <b>Телефон:</b> ${data.phone}
💬 <b>Сообщение:</b> ${messageText}
📅 <b>Дата:</b> ${date}
🌐 <b>Источник:</b> ${data.source}`;
}

// Format status update message for Telegram
function formatStatusUpdateMessage(data: TelegramOrderStatus): string {
  const emoji = data.status === 'viewed' ? '👁️' : '🆕';
  const statusText = data.status === 'viewed' ? 'Просмотрено' : 'Новая';
  const date = new Date(data.timestamp).toLocaleString('ru-RU', {
    timeZone: 'Europe/Minsk',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const statusEmoji = data.status === 'viewed' ? '✅' : '🔄';
  
  return `${emoji} <b>Статус заявки обновлен!</b>

🆔 <b>ID заявки:</b> <code>${data.orderId}</code>
📊 <b>Статус:</b> ${statusEmoji} ${statusText}
📅 <b>Время обновления:</b> ${date}`;
}

// Test Telegram connection
export const testTelegramConnection = async (): Promise<boolean> => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
    return response.ok;
  } catch (error) {
    console.error('Telegram connection test failed:', error);
    return false;
  }
}; 