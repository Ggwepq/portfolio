import { SYSTEM_PROMPT } from './prompt.js';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    let groqKey = process.env.GROQ_API_KEY;

    // Fallback: If process.env wasn't refreshed after editing .env locally
    if (!groqKey) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const envPath = path.resolve(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, 'utf8');
          const match = content.match(/^GROQ_API_KEY=(.*)$/m);
          if (match && match[1]) {
            groqKey = match[1].trim().replace(/^["']|["']$/g, '');
          }
        }
      } catch (e) {
        // Fallback silently
      }
    }

    if (!groqKey) {
      return res.status(500).json({
        error: 'GROQ_API_KEY is not configured in your environment.'
      });
    }

    // Limit user input to 500 characters to prevent prompt injection / token abuse
    const cleanMessage = message.trim().slice(0, 500);

    // Keep only the last 6 messages of conversation history to keep context tight and fast
    const recentHistory = Array.isArray(history)
      ? history.slice(-6).filter(h => h && h.role && h.content)
      : [];

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...recentHistory.map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content).slice(0, 500)
      })),
      { role: 'user', content: cleanMessage }
    ];

    const model = process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
        max_tokens: 600
      })
    });

    if (!groqRes.ok) {
      const errorText = await groqRes.text();
      console.error('Groq API error:', errorText);
      return res.status(groqRes.status).json({
        error: `Groq error (${groqRes.status}): Failed to generate response.`
      });
    }

    const groqData = await groqRes.json();
    const reply = groqData.choices?.[0]?.message?.content || 'No response generated.';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Serverless function error:', err);
    return res.status(500).json({ error: 'Internal server error processing request.' });
  }
}
