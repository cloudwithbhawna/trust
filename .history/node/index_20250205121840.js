// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

// Serve static files from the public folder
app.use(express.static('public'));

// Serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
