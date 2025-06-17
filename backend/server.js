import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/mongodb.js';
import { clerkWebhooks } from './src/controller/webhooks.js';

const app = express();

// connect to MongoDB
await connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("LMS API working..."));

app.post('/clerk', clerkWebhooks);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
