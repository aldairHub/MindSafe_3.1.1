export default async function handler(req, res) {
  const apiKey = process.env.API_KEY;
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  if (req.method === 'POST') {
      const userMessage = req.body.message;

      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiKey}`
              },
              body: JSON.stringify({
                  model: 'gpt-3.5-turbo',
                  messages: [
                      { role: 'system', content: 'Eres un asistente útil que ayuda a jóvenes con adicción a las redes sociales.' },
                      { role: 'user', content: userMessage }
                  ]
              })
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          const botResponse = data.choices[0].message.content;
          res.status(200).json({ message: botResponse });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  } else {
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}
