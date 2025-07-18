const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // ✅ NEW LINE

console.log("🟡 Starting server.js");

dotenv.config();
console.log("✅ .env loaded");

// MongoDB connection
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes); // ✅ NEW LINE

// Test route
app.get('/', (req, res) => {
  res.send('API Running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
