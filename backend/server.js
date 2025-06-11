const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const auth = require('./src/routes/auth');
const courses = require('./src/routes/course')

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('SaaS LMS API is running...');
});

// Routes will be mounted here
app.use('/api',auth );
app.use('/api/courses', courses);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
