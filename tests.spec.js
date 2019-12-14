let app, server;
const request = require('supertest');

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
      .send({targetURL: 'JoshMatz'})
      .expect(
        200,
        {
          url: 'JoshMatz',
        },
        done,
      );
  });

  it('responds with json', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
