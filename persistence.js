const uuidv5 = require('uuid/v5');

class Persistence {
  constructor() {
    this.targetSpace = {};
    this.shortenSpace = {};
    this.counter = 0;
  }
  _getShorten() {
    return `/${this.counter++}`;
  }
  saveURL(url) {
    const hashedURL = uuidv5(url, uuidv5.URL);
    const shortenURL = this._getShorten();
    this.targetSpace[hashedURL] = {targetURL: url, shorten: shortenURL};
    this.shortenSpace[shortenURL] = {targetURL: url, hashedURL: hashedURL};
    return shortenURL;
  }
  checkExistURL(url) {
    const hashedURL = uuidv5(url, uuidv5.URL);
    if (this.targetSpace[hashedURL]) return true;
    return false;
  }
  loadURL(shortenURL) {
    return this.shortenSpace[shortenURL].targetURL;
  }
}

module.exports = Persistence;
