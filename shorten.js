const Persistence = require('./persistence');

class Shorten {
  constructor(persistence = new Persistence()) {
    this.persistence = persistence;
  }

  setTargetURL(targetURL) {
    if (this.persistence.checkExistURL(targetURL)) {
      throw Error('Already exist');
    }
    return this.persistence.saveURL(targetURL);
  }

  getShortenURL(targetURL) {
    return this.persistence.getExistShortenURL(targetURL);
  }

  getTargetURL(shortenURL) {
    return this.persistence.loadURL(shortenURL);
  }
}

let shorten;
function getShortenClass() {
  if (shorten) return shorten;
  shorten = new Shorten();
  return shorten;
}

module.exports = getShortenClass();
