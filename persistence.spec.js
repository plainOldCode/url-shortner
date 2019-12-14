const Persistence = require('./persistence');

describe('Persistence test', function() {
  it('Save', function(done) {
    const persistence = new Persistence();
    const testURLString = 'https://google.com';
    const shortenURL = persistence.saveURL(testURLString);
    expect(persistence.loadURL(shortenURL)).toBe(testURLString);
    done();
  });

  it('Check Exist True', function(done) {
    const persistence = new Persistence();
    const testURLString = 'https://google.com';
    const shortenURL = persistence.saveURL(testURLString);
    expect(persistence.checkExistURL(testURLString)).toBe(true);
    expect(persistence.loadURL(shortenURL)).toBe(testURLString);
    done();
  });

  it('Check Exist False', function(done) {
    const persistence = new Persistence();
    const testURLString = 'https://google.com';
    const compareURLString = 'https://google.com/about';
    const shortenURL = persistence.saveURL(testURLString);
    expect(persistence.checkExistURL(compareURLString)).toBe(false);
    done();
  });
});
