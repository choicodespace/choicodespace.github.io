const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow frontend origin explicitly
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://improved-cod-69ppxgjp459wc49jw-5173.app.github.dev'
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
