const mysql = require('mysql')
const db = mysql.createPool({
    host:'127.0.0.1',
    database:'my_table_01',
    user:'root',
    password:'admin123'
})
module.exports = db