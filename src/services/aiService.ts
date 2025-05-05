interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Environment variables for API keys
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
const AZURE_OPENAI_API_KEY = process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY || '';
const AZURE_OPENAI_ENDPOINT = process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT || '';

/**
 * Service to handle AI chat functionality
 */
export const aiService = {
  /**
   * Send user message to AI and get a response
   * @param message - User message to send to AI
   * @returns AI response message
   */
  async sendMessage(message: string): Promise<string> {
    try {
      // Check if OpenAI API key is configured
      if (OPENAI_API_KEY) {
        return await callOpenAI(message);
      } 
      // Check if Azure OpenAI API is configured
      else if (AZURE_OPENAI_API_KEY && AZURE_OPENAI_ENDPOINT) {
        return await callAzureOpenAI(message);
      } 
      // No API keys configured, use fallback
      else {
        console.warn('No API keys configured. Using fallback response.');
        return getFallbackResponse(message);
      }
    } catch (error) {
      console.error('Error calling AI API:', error);
      return getFallbackResponse(message);
    }
  }
};

/**
 * Call OpenAI API
 * @param message - User message
 * @returns AI response
 */
async function callOpenAI(message: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant specializing in cryptocurrency, trading, staking, and blockchain topics. Provide concise, accurate information in a friendly tone. If you don\'t know something, be honest about it.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 1000
    })
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('OpenAI API error:', data);
    throw new Error(`API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.choices[0].message.content;
}

/**
 * Call Azure OpenAI API
 * @param message - User message
 * @returns AI response
 */
async function callAzureOpenAI(message: string): Promise<string> {
  // Azure OpenAI requires a deployment name
  const deploymentName = 'gpt-35-turbo'; // Replace with your actual deployment name
  
  const response = await fetch(`${AZURE_OPENAI_ENDPOINT}/openai/deployments/${deploymentName}/chat/completions?api-version=2023-05-15`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': AZURE_OPENAI_API_KEY
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant specializing in cryptocurrency, trading, staking, and blockchain topics. Provide concise, accurate information in a friendly tone. If you don\'t know something, be honest about it.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 1000
    })
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Azure OpenAI API error:', data);
    throw new Error(`API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.choices[0].message.content;
}

/**
 * Get a fallback response when API is not available
 * @param message - User message
 * @returns Fallback response
 */
function getFallbackResponse(message: string): string {
  const lowercaseMessage = message.toLowerCase();
  
  // Predefined responses to common questions
  if (lowercaseMessage.includes('стейкинг') || lowercaseMessage.includes('staking')) {
    return 'Стейкинг - это процесс хранения криптовалют на блокчейне для поддержки работы сети и получения вознаграждения. При стейкинге ваши средства "замораживаются" на определенный период, а вы получаете проценты за их блокировку.';
  }
  
  if (lowercaseMessage.includes('биржа') || lowercaseMessage.includes('exchange')) {
    return 'Криптовалютная биржа - это платформа, где вы можете покупать, продавать и обменивать различные криптовалюты. Биржи могут быть централизованными (как Binance или Coinbase) или децентрализованными (как Uniswap).';
  }
  
  if (lowercaseMessage.includes('блокчейн') || lowercaseMessage.includes('blockchain')) {
    return 'Блокчейн - это распределенная база данных, которая хранит информацию в виде блоков, связанных между собой. Это технология, лежащая в основе криптовалют, которая обеспечивает безопасность, прозрачность и неизменность данных.';
  }
  
  if (lowercaseMessage.includes('трейдинг') || lowercaseMessage.includes('trading')) {
    return 'Трейдинг криптовалют - это покупка и продажа цифровых активов с целью получения прибыли от изменения их цены. Существуют различные стратегии трейдинга, включая дневную торговлю, свинг-трейдинг и позиционную торговлю.';
  }
  
  if (lowercaseMessage.includes('смарт контракт') || lowercaseMessage.includes('smart contract')) {
    return 'Смарт-контракт - это самоисполняющийся компьютерный код, который автоматически выполняется при соблюдении определенных условий. Смарт-контракты работают на блокчейне и позволяют проводить транзакции без посредников, обеспечивая прозрачность и безопасность.';
  }
  
  // Default response
  return 'Извините, в данный момент я не могу ответить на этот вопрос. Пожалуйста, попробуйте спросить что-то другое о криптовалютах, трейдинге или блокчейне.';
} 