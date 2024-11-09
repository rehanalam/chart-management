const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');

const baseUrl = 'https://api.stlouisfed.org/fred'
const apiKey = 'b5012636c81dde3475ff4c99dba14ec9'

// Middleware function to handle CORS for specific origins
function setCorsHeaders(req, res) {
    const allowedOrigins = ["http://localhost:3000", "http://localhost:4000"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
}

// Main route for handling requests to an external API with CORS enabled
router.get('/', (req, res) => {
    setCorsHeaders(req, res);

    const options = {
        uri: `${baseUrl}/category?category_id=125&api_key=${apiKey}&file_type=json`,
        json: true // Automatically parses the JSON string in the response
    };

    requestPromise(options)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json({ error: error.message }));
});


router.get('/children', (req, res) => {
    setCorsHeaders(req, res);

    const options = {
        uri: `${baseUrl}/category/children?category_id=13&api_key=${apiKey}&file_type=json`,
        json: true // Automatically parses the JSON string in the response
    };

    requestPromise(options)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json({ error: error.message }));
});

router.get('/related', (req, res) => {
    setCorsHeaders(req, res);

    const options = {
        uri: `${baseUrl}/category/related?category_id=33705&api_key=${apiKey}&file_type=json`,
        json: true // Automatically parses the JSON string in the response
    };

    requestPromise(options)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;
