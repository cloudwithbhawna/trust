const express = require('express');
const app = express();
require('dotenv').config();
const volunteersRoutes = require('./routes/volunteersRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));

// Use volunteers API routes
app.use('/api/volunteers', volunteersRoutes);

app.get('/', (req, res) => res.send('Volunteer API'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
