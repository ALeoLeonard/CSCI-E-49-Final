const mysql = require('mysql');
const { dbConnectionDetails } = require('../config/config');

//Parameterized queries for preventing SQL injection
const executeQuery = (sqlQuery, queryParams, callback) => {
    const dbConnection = mysql.createConnection(dbConnectionDetails);
    
    dbConnection.connect(err => {
        if (err) {
            dbConnection.end();
            return callback(err, null);
        }

        dbConnection.query(sqlQuery, queryParams, (queryError, results) => {
            dbConnection.end();
            if (queryError) {
                return callback(queryError, null);
            }
            callback(null, results);
        });
    });
};

const getAllFromFinalProjectTable = (callback) => {
    // Specify the required columns explicitly to prevent data leakage vs select *
    const sqlQuery = `
        SELECT 
            sequence_number, status, observation_id, type, 
            pi_name, observer, public_release_date, instrument, 
            y_amp, y_freq, y_phase, z_amp, z_freq, z_phase, 
            raster_scan, photometry, event_count
        FROM Final_Project_Table
    `;
    executeQuery(sqlQuery, [], (queryError, results) => {
        if (queryError) {
            console.error('Error executing public data query:', queryError);
            return callback(queryError, null);
        }
        callback(null, results);
    });
};

const getPublicData = (callback) => {
    const sqlQuery = `
        SELECT 
            sequence_number, status, observation_id, type, 
            pi_name, observer, public_release_date, instrument, 
            y_amp, y_freq, y_phase, z_amp, z_freq, z_phase, 
            raster_scan, photometry, event_count
        FROM Final_Project_Table
        WHERE public_release_date <= NOW()
    `;
    executeQuery(sqlQuery, [], (queryError, results) => {
        if (queryError) {
            console.error('Error executing public data query:', queryError);
            return callback(queryError, null);
        }
        callback(null, results);
    });
};

module.exports = { 
    executeQuery,
    getAllFromFinalProjectTable,
    getPublicData
};