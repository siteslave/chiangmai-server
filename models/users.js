
let Q = require('q');

module.exports = {
  login(db, username, password) {
    let q = Q.defer();
    // sql query
    let sql = `SELECT * FROM users WHERE username=? and password=?`;
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [username, password], (err, rows) => {
          if (err) q.reject(err);
          else q.resolve(rows);
        });
        conn.release();
      }
    });

        return q.promise;
  },


  //========= FCM ============
  saveDeviceToken(db, userId, deviceToken) {
    let q = Q.defer();
    // sql query
    let sql = `UPDATE users SET device_token=?, is_accept="Y" WHERE id=?`;
    // run query
    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        conn.query(sql, [deviceToken, userId], (err) => {
          if (err) q.reject(err);
          else q.resolve();
        });
        conn.release();
      }
    });

    return q.promise;
  },

  getDeviceToken(db, userId) {
    let q = Q.defer();

    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        let sql = `SELECT device_token FROM users WHERE id=?`;
        conn.query(sql, [userId], (err, rows) => {
          if (err) q.reject(err);
          else {
            q.resolve(rows);
          }
        });
        conn.release();
      }
    });

    return q.promise;
  },

  cancelAccept(db, userId) {
    let q = Q.defer();

    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        let sql = `UPDATE users SET is_accept="N" WHERE id=?`;
        conn.query(sql, [userId], (err) => {
          if (err) q.reject(err);
          else {
            q.resolve();
          }
        });
        conn.release();
      }
    });

    return q.promise;
  },

  getAcceptStatus(db, userId) {
    let q = Q.defer();

    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        let sql = `SELECT is_accept FROM users WHERE id=?`;
        conn.query(sql, [userId], (err, rows) => {
          if (err) q.reject(err);
          else {
            q.resolve(rows[0]);
          }
        });
        conn.release();
      }
    });

    return q.promise;
  },

  getUsers(db) {
    let q = Q.defer();

    db.getConnection((err, conn) => {
      if (err) {
        q.reject(err);
      } else {
        let sql = `SELECT id, username, fullname FROM users group by username`;
        conn.query(sql, [], (err, rows) => {
          if (err) q.reject(err);
          else {
            q.resolve(rows);
          }
        });
        conn.release();
      }
    });

    return q.promise;
  }

}