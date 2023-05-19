// Import de mysql et config de la BDD
const  mysql = require('mysql');
const  dbConfig = require('../config/db.config');

// Creation d'une connection
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
})

// Ouverture d'une connection
connection.connect(error => {
        if (error) throw error;
        console.log('Connection réussi')
});

module.exports = connection;