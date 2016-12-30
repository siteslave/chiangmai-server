var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');

// GET http://localhost:3000/customers
router.get('/', function (req, res, next) {
  let dbPool = req.dbPool;
  // Get customers
  Customer.list(dbPool)
    .then((rows) => {
      let customers = [];
      rows.forEach(v => {
        let customer = {};
        customer.id = v.id;
        customer.first_name = v.first_name;
        customer.last_name = v.last_name;
        customer.sex = v.sex;
        customer.customer_type_id = v.customer_type_id;
        customer.image = v.image ? v.image.toString() : null;
        customer.telephone = v.telephone;
        customer.email = v.email;
        customers.push(customer);
      });

      res.send({ ok: true, rows: customers });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});
// GET http://localhost:3000/customers
router.get('/search/:query', function (req, res, next) {
  let dbPool = req.dbPool;
  let query = req.params.query;
  // Get customers
  Customer.search(dbPool, query)
    .then((rows) => {
      let customers = [];
      rows.forEach(v => {
        let customer = {};
        customer.id = v.id;
        customer.first_name = v.first_name;
        customer.last_name = v.last_name;
        customer.sex = v.sex;
        customer.customer_type_id = v.customer_type_id;
        customer.image = v.image ? v.image.toString() : null;
        customer.telephone = v.telephone;
        customer.email = v.email;
        customers.push(customer);
      })
      res.send({ ok: true, rows: customers });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});
// GET http://localhost:3000/customers/detail/xx
router.get('/detail/:customerId', function (req, res, next) {
  let dbPool = req.dbPool;
  let customerId = req.params.customerId;
  // Get customers
  Customer.detail(dbPool, customerId)
    .then((rows) => {
      let detail = rows[0];
      let customer = {};
        customer.id = detail.id;
        customer.first_name = detail.first_name;
        customer.last_name = detail.last_name;
        customer.sex = detail.sex;
        customer.customer_type_id = detail.customer_type_id;
        customer.image = detail.image ? detail.image.toString() : null;
        customer.telephone = detail.telephone;
        customer.email = detail.email;
      res.send({ ok: true, customer: customer });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});
// GET http://localhost:3000/customers/groups
router.get('/groups', function (req, res, next) {
  let dbPool = req.dbPool;
  // Get customers
  Customer.getGroups(dbPool)
    .then((rows) => {
      res.send({ ok: true, rows: rows });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});

// DELETE http://localhost:3000/customers
router.delete('/:customerId', function (req, res, next) {
  let dbPool = req.dbPool;
  let customerId = req.params.customerId;
  // Get customers
  Customer.remove(dbPool, customerId)
    .then(() => {
      res.send({ ok: true });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});
// POST http://localhost:3000/customrs
router.post('/', function (req, res, next) {
  let dbPool = req.dbPool;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let sex = req.body.sex;
  let customerTypeId = req.body.customerTypeId;
  let telephone = req.body.telephone;
  let email = req.body.email;
  let image = req.body.image;

  if (firstName && lastName) {
    // Save customers
    Customer.save(dbPool, firstName, lastName, sex, customerTypeId, telephone, email, image)
      .then((rows) => {
        let customer = {
          id: rows.insertId,
          first_name: firstName,
          last_name: lastName,
          sex: sex,
          customer_type_id: customerTypeId,
          telephone: telephone,
          email: email
        };
        res.send({ ok: true, customer: customer });
      }, (error) => {
        res.send({ ok: false, error: error });
      });
  } else {
    res.send({ ok: false, error: 'Data incomplete' });
  }

});
// POST http://localhost:3000/customers/save-map
router.post('/save-map', function (req, res, next) {
  let dbPool = req.dbPool;
  let customerId = req.body.customerId;
  let lat = req.body.lat;
  let lng = req.body.lng;

  if (customerId && lat && lng) {
    // Save customers
    Customer.saveMap(dbPool, customerId, lat, lng)
      .then((rows) => {
        res.send({ ok: true });
      }, (error) => {
        res.send({ ok: false, error: error });
      });
  }

});
// POST http://localhost:3000/customers/get-map/2
router.get('/get-map/:customerId', function (req, res, next) {
  let dbPool = req.dbPool;
  let customerId = req.params.customerId;

  if (customerId) {
    // Save customers
    Customer.getMap(dbPool, customerId)
      .then((rows) => {
        if (rows.length) {
          let lat = rows[0].lat;
          let lng = rows[0].lng;
          res.send({ ok: true, latLng: { lat: lat, lng: lng } });
        } else {
          res.send({ ok: true });
        }
      }, (error) => {
        res.send({ ok: false, error: error });
      });
  }

});
// PUT http://localhost:3000/customrs
router.put('/', function (req, res, next) {
  let dbPool = req.dbPool;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let sex = req.body.sex;
  let customerTypeId = req.body.customerTypeId;
  let telephone = req.body.telephone;
  let email = req.body.email;
  let image = req.body.image;
  let customerId = req.body.customerId;

  if (firstName && lastName) {
    // Save customers
    Customer.update(dbPool, customerId, firstName, lastName, sex, customerTypeId, telephone, email, image)
      .then((rows) => {
        let customer = {
          id: customerId,
          first_name: firstName,
          last_name: lastName,
          customer_type_id: customerTypeId,
          telephone: telephone,
          email: email,
          image: image
        };
        res.send({ ok: true, customer: customer });
      }, (error) => {
        res.send({ ok: false, error: error });
      });
  }

});

module.exports = router;
