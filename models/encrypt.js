var CryptoJS = require('crypto-js');
var secretKey = '1234567890';

module.exports = {
  encrypt(text) {
    var ciphertext = CryptoJS.AES.encrypt(text, secretKey);
    var encryptedText = ciphertext.toString();
    return encryptedText;  
  },

  decrypt(text) {
    var decryptedText = CryptoJS.AES.decrypt(text, secretKey);
    var data = decryptedText.toString(CryptoJS.enc.Utf8);
    return data;
  }
}