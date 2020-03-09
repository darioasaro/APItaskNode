const db = require('../config/connection')
const table = 'users'

exports.login = (req, res) => {
    var user = req.body.user;
    var pass = req.body.pass;
    console.log("user:", user, "pass:", pass);
  
    if (user && pass) {
      db.connection.query(
        `SELECT * FROM users WHERE name=? AND pass=?`,
        [user, pass],
        (err, rows) => {
          if (err) {
            res.status(500).json({ error: "dbError" });
            throw err;
          }
          //HAY QUE CREAR UN USER SOLO CON LOS DATOS NECESARIOS
          if (rows.length > 0) {
            res.json({ result: true, user: rows[0] });
          } else {
            res.status(404).json({ result: "unautorizhed" });
          }
        }
      );
    } else {
      res.send("bad data");
    }
  };