const express = require('express');
const app = express();
const request = require('supertest');

app.post('/',function (req, res) {
	const targetURL = req.body.targetURL;
	console.log("ok",targetURL);
	res.send({url:targetURL});
});

app.get('/', function (req, res) {
  res.send({ msg:'Hello World!'});
});
/*
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/

module.exports = app;
