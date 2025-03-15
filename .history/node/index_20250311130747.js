const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import volunteers routes
const volunteersRoutes = require('./routes/volunteersRoutes');
const paymentRoutes = require('./routes/payment');



dotenv.config();

const app = express();

// Serve static files from the public folder
app.use(express.static('public'));

// Serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));

// Enable CORS for all routes
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Volunteers API routes
app.use('/api/volunteers', volunteersRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
