const express = require('express');

const ibmdb = require("ibm_db");


module.exports = function (app) {
  const router = express.Router();

  var env = JSON.parse(process.env.VCAP_SERVICES);
  var db2 = env['dashDB For Transactions'][0].credentials;

  const connString = "DRIVER={DB2};DATABASE=" + db2.database + ";UID=" + db2.username + ";PWD=" + db2.password + ";HOSTNAME=" + db2.host + ";port=" + db2.port;

  router.get('/', function (req, res, next) {
    let query = "SELECT * FROM transaction ORDER BY trans_id ASC FETCH FIRST 1000 ROWS ONLY"; // query database to get all the players
      ibmdb.open(connString, function(err,conn){
              // execute query
      conn.query(query, (err, result) => {
          if (err) {
              console.log(err);
              return conn.closeSync();
          }
          console.log("data result ", result);
          conn.close(function () {
            console.log('done');
          });
          res.json(result);
        });

      });
  });

  app.use('/transaction', router);
}