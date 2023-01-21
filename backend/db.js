const mysql = require("mysql");

const db = mysql.createConnection({
  host: 'functionup-rds-mysql8-t4-20gib.cffqxyd9k6a4.ap-south-1.rds.amazonaws.com',
  port: 3306,
  user: 'data_analyst',
  password: 'sqlforjob',
  database: 'sandbox'
})

module.exports = { db }