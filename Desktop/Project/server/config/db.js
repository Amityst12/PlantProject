const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'mahon',
  port: 3306, // Specify the MySQL port
  waitForConnections: true,
  connectionLimit: 10
});

pool.getConnection()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection failed:', err));

module.exports = pool;


