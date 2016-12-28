
let Q = require('q');

module.exports = {
  list(db) {
    let q = Q.defer();
    // sql query
    let sql = `SELECT * FROM customers ORDER BY first_name, last_name`;
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [], (err, rows) => {
          if (err) q.reject(err);
          else q.resolve(rows);
        });
        conn.release();
      }
    });

    return q.promise;
  },
  // search
  search(db, query) {
    let q = Q.defer();
    // sql query
    let _query = `%${query}%`;
    let sql = `SELECT * FROM customers WHERE (first_name LIKE ? OR last_name LIKE ?) ORDER BY first_name, last_name`;
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [_query, _query], (err, rows) => {
          if (err) q.reject(err);
          else q.resolve(rows);
        });
        conn.release();
      }
    });

    return q.promise;
  },
  // get customer detail
  detail(db, customerId) {
    let q = Q.defer();
    // sql query
    let sql = `SELECT * FROM customers WHERE id=?`;
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [customerId], (err, rows) => {
          if (err) q.reject(err);
          else q.resolve(rows[0]);
        });
        conn.release();
      }
    });

    return q.promise;
  },

  getGroups(db) {
    let q = Q.defer();
    // sql query
    let sql = `SELECT * FROM customer_types ORDER BY name`;
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [], (err, rows) => {
          if (err) q.reject(err);
          else q.resolve(rows);
        });
        conn.release();
      }
    });

    return q.promise;
  },

  save(db, firstName, lastName, sex, customerTypeId, telephone, email, image) {
    let q = Q.defer();
    // sql query
    let sql = `
    INSERT INTO customers(first_name, last_name, sex, customer_type_id, telephone, email, image)
    VALUES(?, ?, ?, ?, ?, ?, ?)
    `;
    // run query
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [firstName, lastName, sex, customerTypeId, telephone, email, image], (err, rows) => {
          if (err) q.reject(err);
          else q.resolve(rows);
        });
        conn.release();
      }
    });

    return q.promise;
  },

  saveMap(db, customerId, lat, lng) {
    let q = Q.defer();
    // sql query
    let sql = `
    UPDATE customers SET lat=?, lng=? WHERE id=?
    `;
    // run query
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [lat, lng, customerId], (err) => {
          if (err) q.reject(err);
          else q.resolve();
        });
        conn.release();
      }
    });

    return q.promise;
  },

  getMap(db, customerId) {
    let q = Q.defer();
    // sql query
    let sql = `SELECT lat, lng FROM customers WHERE id=?
    `;
    // run query
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [customerId], (err, rows) => {
          if (err) q.reject(err);
          else q.resolve(rows);
        });
        conn.release();
      }
    });

    return q.promise;
  },

  update(db, customerId, firstName, lastName, sex, customerTypeId, telephone, email, image) {
    let q = Q.defer();
    // sql query
    let sql = `
    UPDATE customers SET first_name=?, last_name=?, sex=?, customer_type_id=?, telephone=?, email=?, image=?
    WHERE id=?
    `;
    // run query
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [firstName, lastName, sex, customerTypeId, telephone, email, image, customerId], (err) => {
          if (err) q.reject(err);
          else q.resolve();
        });
        conn.release();
      }
    });

    return q.promise;
  },

  detail(db, customerId) {
    let q = Q.defer();
    // sql query
    let sql = `SELECT * FROM customers WHERE id=?`;
    // run query
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [customerId], (err, rows) => {
          if (err) q.reject(err);
          else q.resolve(rows);
        });
        conn.release();
      }
    });

    return q.promise;
  },

  remove(db, customerId) {
    let q = Q.defer();
    // sql query
    let sql = `DELETE FROM customers WHERE id=?`;
    // run query
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [customerId], (err) => {
          if (err) q.reject(err);
          else q.resolve();
        });
        conn.release();
      }
    });

    return q.promise;
  }
}