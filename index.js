const app = require('./lib/server');
const PORT = 80;
app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
