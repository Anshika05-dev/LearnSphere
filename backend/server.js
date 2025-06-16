import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './src/config/db.js';
import { clerkWebhooks } from './src/controllers/webhooks.js';

const app = express();
await connectDB();

app.use(cors());


app.get('/', (req, res) => {
  res.send('SaaS LMS API is running...');
});
app.post('/clerk',express.json(),clerkWebhooks)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
