import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

console.log('🔧 Starter AI Proxy...');
console.log('API_KEY loaded:', process.env.API_KEY ? '✅ Ja' : '❌ Nej');

const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');

app.post('/api/gemini/generate-content', async (req, res) => {
  console.log('📨 Modtaget request til Gemini');
  const { model, contents, config } = req.body;
  
  try {
    const generativeModel = genAI.getGenerativeModel({ model });
    const result = await generativeModel.generateContent({
      contents,
      generationConfig: config,
    });
    const response = await result.response;
    console.log('✅ Gemini svarede');
    res.json({ text: response.text() });
  } catch (error: any) {
    console.error('❌ Gemini fejl:', error.message);
    res.status(500).json({ error: 'AI Proxy fejlede', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 AI Proxy kører på http://localhost:${PORT}`);
});

export default app;