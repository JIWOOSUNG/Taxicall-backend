const db = require('mysql')

const conn = db.createConnection( {
    host:'localhost',
    port:3000,
    user:'taxi',
    password:'taxi',
    database:'taxi'
})

module.exports = conn