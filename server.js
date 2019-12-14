const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json
app.post('/', function(req, res) {
  const targetURL = req.body.targetURL;
  console.log('ok', targetURL);
  res.json({url: targetURL});
});

app.get('/', function(req, res) {
  res.send({msg: 'Hello World!'});
});

module.exports = app;
