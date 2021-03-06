// Get dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./routes/api').router;

// Start Integration
require('./services/twitter-slack').integrate();

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// Set our api routes
app.use('/', api);

// Get port from environment and store in Express.
const port = process.env.EXPRESS_PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = server