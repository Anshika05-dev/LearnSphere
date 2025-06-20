import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/mongodb.js';
import { clerkWebhooks, stripeWebhooks } from './src/controller/webhooks.js';
import educatorRouter from './src/routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './src/config/cloudinary.js';
import courseRouter from './src/routes/courseRoute.js';
import userRouter from './src/routes/userRoutes.js';


const app = express();

// connect to MongoDB
await connectDB();
await connectCloudinary();

app.use(cors());

app.get('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

app.use(clerkMiddleware())
app.use(express.json());

app.get('/', (req, res) => res.send("LMS API working..."));
app.post('/clerk',clerkWebhooks);
app.use('/api/educator',educatorRouter)
app.use('/api/course',courseRouter)
app.use('/api/user',userRouter)


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
