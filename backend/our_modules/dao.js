/**
 * Created by Romain on 24/11/2015.
 * Module de connexion à BD mysql
 */

var mysql = require('mysql');

//TODO singleton
//var dao = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: '',
//    database: 'pfe'
//    //TODO multipleStatements: true
//});

// MAC OS ROM
var dao = mysql.createConnection({
    host: 'localhost', user: 'root',
    password: 'root',
    database: 'pfe',
    port: 8889
    //TODO multipleStatements: true
});

var getConnection = function () {
    return dao;
};

exports.getConnection = getConnection;
