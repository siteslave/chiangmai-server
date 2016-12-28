var express = require('express');
var router = express.Router();

var User = require('../models/users');
var gcm = require('node-gcm');

//========== FCM =============

router.post('/register-device', function (req, res, next) {
  let deviceToken = req.body.deviceToken;
  let userId = req.decoded.userId;
  let dbPool = req.dbPool;

  console.log(req.decoded);
  console.log(deviceToken);
  // save device token
  User.saveDeviceToken(dbPool, userId, deviceToken)
    .then(() => {
      res.send({ ok: true });
    }, (err) => {
      res.send({ ok: false, error: err });
    });
});

router.get('/cancel-accept', function (req, res, next) {
  let userId = req.decoded.userId;
  let dbPool = req.dbPool;
  // save device token
  User.cancelAccept(dbPool, userId)
    .then(() => {
      res.send({ ok: true });
    }, (err) => {
      res.send({ ok: false, error: err });
    });
});

router.get('/users-list', function (req, res, next) {
  let userId = req.decoded.userId;
  let dbPool = req.dbPool;
  // save device token
  User.getUsers(dbPool)
    .then((rows) => {
      res.send({ ok: true, rows: rows });
    }, (err) => {
      res.send({ ok: false, error: err });
    });
});

router.get('/accept-status', function (req, res, next) {
  let userId = req.decoded.userId;
  let dbPool = req.dbPool;
  // save device token
  User.getAcceptStatus(dbPool, userId)
    .then((rows) => {
      console.log(rows);
      let acceptStatus = rows.is_accept ? rows.is_accept : 'N';
      res.send({ ok: true, status: acceptStatus });
    }, (err) => {
      res.send({ ok: false, error: err });
    });
});

router.post('/send-message', function (req, res, next) {
  let _message = req.body.message;
  let userId = req.body.userId;
  let dbPool = req.dbPool;
  console.log(userId, _message);
  User.getDeviceToken(dbPool, userId)
    .then((rows) => {
      let tokens = [];
      tokens.push(rows[0].device_token);
      let message = new gcm.Message();
      message.addData('title', 'ประกาศ');
      message.addData('message', _message);
      message.addData('content-available', true);
      message.addData('data', { "username": "Satit", "message": "Hello world" });
      message.addData('image', 'http://www.pro.moph.go.th/w54/images/ICT/loadlogomoph.png');

      let sender = new gcm.Sender('AAAA9O0a6_Y:APA91bH_-RjwhjeoNLfhLn6K8x13-PNruKqvWDqxFSjIjuIjG29qQ85SPHsLrPMB9ZbJf8Mul0LniBRbDaX7Wsx9IPiN9pOYGEtUOScjeSB1-mo7_6Ex2l7o9p0qFOBwQjghvfFCso2sUxWMBriLHcO4Up1WNMza1A');

      sender.send(message, { registrationTokens: tokens }, (err, response) => {
        if (err) {
          console.log(err);
          res.send({ ok: false, error: err });
        } else {
          console.log(response);
          res.send({ ok: true });
        }
      });

    }, (err) => {
      console.log(err);
      res.send({ ok: false, error: err });
    });
});

module.exports = router;
