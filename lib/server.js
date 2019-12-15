const express = require('express');
const app = express();
const shorten = require('./shorten');
const AppAddress = 'http://localhost';
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    // API informations (required)
    title: 'url-shortner', // Title (required)
    version: '0.0.1', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  //host, // Host (optional)
  basePath: '/', // Base path (optional)
};
// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // Path to the API docs
  apis: ['./lib/server.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   post:
 *     description: enroll target url
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: url
 *         description: target url
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: get shorten url
 *
 */
app.post('/', function(req, res) {
  const targetURL = req.query.url;
  let shortenURL, message;
  try {
    shortenURL = shorten.setTargetURL(targetURL);
    message = 'First enrolled';
  } catch (e) {
    if (e.message === 'Already exist') {
      shortenURL = shorten.getShortenURL(targetURL);
      message = e.message;
    }
  }
  res.json({shortenURL: `${AppAddress}${shortenURL}`, message});
});

/**
 * @swagger
 * /{shorten}:
 *   get:
 *     description: redirect to target url
 *     parameters:
 *       - in: path
 *         name: shorten
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       301:
 *         description: redirection url, copy and paste requeset url to your browser
 */
app.get('/*', function(req, res) {
  if (req.path === '/') return res.send('hello');
  const targetURL = shorten.getTargetURL(req.path);
  res.redirect(301, targetURL);
});

module.exports = app;
