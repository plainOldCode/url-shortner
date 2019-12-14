const express = require('express');
const app = express();
const shorten = require('./shorten');
const AppAddress = 'http://localhost';

app.use(express.json()); // for parsing application/json
app.post('/', function(req, res) {
  const targetURL = req.body.targetURL;
  const shortenURL = shorten.setTargetURL(targetURL);
  res.json({url: `${AppAddress}${shortenURL}`});
});

app.get('/*', function(req, res) {
  if (req.path === '/') return res.send('hello');
  console.log('req.path', req.path);
  const targetURL = shorten.getTargetURL(req.path);
  res.redirect(301, targetURL);
});

module.exports = app;
