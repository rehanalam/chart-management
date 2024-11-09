const express = require('express');
const path = require('path');
const category = require('./category');
const series = require('./series');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine and views directory
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// Middleware for CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  
  next();
});

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Route for /category, delegating to the `category` module
app.use('/category', category);
app.use('/series', series);


// Start the server
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
