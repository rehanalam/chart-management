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

router.get('/', (req, res) => {
    setCorsHeaders(req, res);
    var seriesId = req.param('series_id');
    
    const options = {
        uri: `${baseUrl}/series?series_id=${seriesId}&api_key=${apiKey}&file_type=json`,
        json: true // Automatically parses the JSON string in the response
    };

    requestPromise(options)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json({ error: error.message }));
});


// Main route for handling requests to an external API with CORS enabled
router.get('/search', (req, res) => {
    setCorsHeaders(req, res);
    var searchText = req.param('search_text');

    const options = {
        uri: `${baseUrl}/series/search?search_text=${searchText}&api_key=${apiKey}&file_type=json`,
        json: true // Automatically parses the JSON string in the response
    };

    requestPromise(options)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json({ error: error.message }));
});


router.post('/observations', (req, res) => {
    setCorsHeaders(req, res);
    var body = req.body

    const options = {
        uri: `${baseUrl}/series/observations?series_id=${body?.seriesId}&api_key=${apiKey}&file_type=json&limit=${body?.limit}&units=${body?.units}&frequency=${body?.frequency}&observation_start=${body?.observationStart}&observation_end=${body?.observationEnd}`,
        json: true // Automatically parses the JSON string in the response
    };

    requestPromise(options)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;
