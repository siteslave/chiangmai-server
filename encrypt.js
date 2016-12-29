var CryptoJS = require('crypto-js');
var plainText = { username: 'admin', password: 'admin' };

var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(plainText), '123456');
var encryptedText = ciphertext.toString();

var decryptedText = CryptoJS.AES.decrypt(encryptedText, '123456');
var data = decryptedText.toString(CryptoJS.enc.Utf8);

console.log(plainText);
console.log(encryptedText);
let json = JSON.parse(data);
console.log(json.username);