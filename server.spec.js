let app, server;
const request = require('supertest');
const AppAddress = 'http://localhost';

describe('GET /user', function() {
  beforeAll(done => {
    app = require('./server');
    server = app.listen(3000, done);
  });

  afterAll(done => {
    server.close(done);
  });

  it('make url shorten', function(done) {
    request(app)
      .post('/')
      .send({targetURL: 'https://google.com'})
      .expect(
        200,
        {
          url: `${AppAddress}/0`,
        },
        done,
      );
  });

  it('get target url from shorten', function(done) {
    request(app)
      .get('/0')
      .expect(301, done);
  });

  it('not exist url from shorten', function(done) {
    request(app)
      .get('/321321')
      .expect(500, done);
  });

  it('root is just hello', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
