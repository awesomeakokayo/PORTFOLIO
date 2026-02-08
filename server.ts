import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import handler from './api/contact.ts';

dotenv.config({ path: './api/.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Simulate Vercel's API routing
app.post('/api/contact', async (req, res) => {
    console.log('Incoming request to /api/contact');
    try {
        // Vercel handlers expect a specific response object. 
        // Express response is mostly compatible with what's used in the script.
        await handler(req, res);
    } catch (error) {
        console.error('Local Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Local API Server running at http://localhost:${PORT}`);
});
