
const mysql = require('mysql');
const { dbConnectionDetails } = require('../config/config');

exports.executeQuery = (sqlQuery, callback) => {
  const dbConnection = mysql.createConnection(dbConnectionDetails);
  dbConnection.connect((dbError) => {
    if (dbError) {
      callback(dbError, null);
      return;
    }

    dbConnection.query(sqlQuery, (queryError, results) => {
      dbConnection.end();
      if (queryError) {
        callback(queryError, null);
      } else {
        callback(null, results);
      }
    });
  });
};
