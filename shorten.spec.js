const shorten = require('./shorten');

describe('Shorten function', function() {
  let firstShortenURL;
  it('set first url', function(done) {
    const targetURL = 'https://www.google.com';
    firstShortenURL = shorten.setTargetURL(targetURL);
    expect(shorten.getTargetURL(firstShortenURL)).toBe(targetURL);
    done();
  });

  it('get first url', function(done) {
    const targetURL = 'https://www.google.com';
    expect(shorten.getTargetURL(firstShortenURL)).toBe(targetURL);
    done();
  });

  it('set first url again', function(done) {
    const targetURL = 'https://www.google.com';
    try {
      shorten.setTargetURL(targetURL);
    } catch (e) {
      expect(e.message).toBe('Already exsit');
    }
    done();
  });

  it('set second url', function(done) {
    const targetURL = 'https://www.google.com/about';
    const secondShortenURL = shorten.setTargetURL(targetURL);
    expect(shorten.getTargetURL(secondShortenURL)).toBe(targetURL);
    done();
  });
});
