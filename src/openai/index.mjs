const request = require('request');
const { config } = require('env');

export function send(message) {
  const body = JSON.stringify({
    prompt: message,
    max_tokens: 2048,
  });
  request(
    {
      method: 'POST',
      url: 'https://api.openai.com/v1/chatbot/chatgpt',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
      },
      body: JSON.stringify({ prompt: message, max_tokens: 2048 }),
    },
    function (error, response, body) {
      if (error) throw new Error(error);
      const script = JSON.parse(body).text;
    }
  );
}
