// Server launchpad
const express = require('express');

// Server routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Instantiate Express
const app = express();
const PORT = process.env.PORT || 3000;

// Set up functionality
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use these routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

