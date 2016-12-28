var gcm = require('node-gcm');
 
var message = new gcm.Message();
message.addData('title', 'ประกาศ');
message.addData('message', 'ทดสอบการส่ง Push notificationi');
message.addData('content-available', true);
message.addData('data', { "username": "Satit", "message": "Hello world" });
// message.addData('notId', 2);
// message.addData('image', 'http://res.cloudinary.com/demo/image/upload/w_133,h_133,c_thumb,g_face/bike.jpg');
message.addData('image', 'http://www.pro.moph.go.th/w54/images/ICT/loadlogomoph.png');

// Set up the sender with you API key, prepare your recipients' registration tokens. 
var sender = new gcm.Sender('AAAA9O0a6_Y:APA91bH_-RjwhjeoNLfhLn6K8x13-PNruKqvWDqxFSjIjuIjG29qQ85SPHsLrPMB9ZbJf8Mul0LniBRbDaX7Wsx9IPiN9pOYGEtUOScjeSB1-mo7_6Ex2l7o9p0qFOBwQjghvfFCso2sUxWMBriLHcO4Up1WNMza1A');
var regTokens = ["ekkaUNlaPxU:APA91bGiH3zC3OqQilz81rwD6CO77YjLPpfAk7u3LLGGYOtNb5SofWUWnQ7XIKbI6RqmzUkGbxbaGtkGYLqw62a03t5tS0fBKjiq5iAKpc-pyOd3tbuvKJmgbvLWvQJn6SjFK87x7XUR"];

sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if(err) console.error(err);
    else 	console.log(response);
});