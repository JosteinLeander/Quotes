// Genererer en ny tilfeldig secret key
const crypto = require('crypto');

module.exports = {
  secretKey: crypto.randomBytes(32).toString('hex')
};