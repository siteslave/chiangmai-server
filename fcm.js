var gcm = require('node-gcm');
 
var message = new gcm.Message();
message.addData('title', 'ข่าว');
message.addData('message', 'กรุณาส่งข้อมูลด่วนๆๆๆๆ');
message.addData('content-available', true);
message.addData('chat', { "username": "Satit", "message": "Hello world" });
// message.addData('notId', 2);
// message.addData('image', 'http://res.cloudinary.com/demo/image/upload/w_133,h_133,c_thumb,g_face/bike.jpg');
message.addData('image', 'http://www.pro.moph.go.th/w54/images/ICT/loadlogomoph.png');

// Set up the sender with you API key, prepare your recipients' registration tokens. 
var sender = new gcm.Sender('AAAAHaGNsA0:APA91bHxmpyw06spVJLL90Zms_vnPKykweTvgcRllxPG22BJuWiiwBTHI4qPQ8I480eMpehd_gJn6sk4eaDSnmfohbr5oCZQG-RBaKRcRTqYJIEKvcLm0egv9SxCC0fJnqXApa8TAy0nefi6Buax-LxDxwckLsVoeA');
var regTokens = ["cVWSg7ZSkCc:APA91bEHmyOWMz6-k-RgqH40R8_h5_keyw331XSIA7-bG68sPQhmrDg3bWizvR5iyAzXOK-pZs_i5rVLehyx1JKJspbgBfsA366FxJ7vNoHIqlxEnjN-q2H0ctjFNeTHBCTXOda5R-Tf"];

sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if(err) console.error(err);
    else 	console.log(response);
});