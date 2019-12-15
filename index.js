const app = require('./lib/server');
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
