const mysql = require('mysql2');

const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_USER_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;

const credentials = {
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName
};

const connection = mysql.createConnection(credentials);

connection.connect(err => {
    if(err){
        throw err
    }
    
    console.log('Connection succsessful ✅');
})

module.exports = connection;