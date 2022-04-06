const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host:'ec2-34-197-84-74.compute-1.amazonaws.com',
    user: 'cbqftjurcemztw',
    password: '50c50f0a7289b1d3d2c96fdfe5019e7786d3b923066d741b6ea5b169b829001e',
    database: 'd7oliqkis9rcn3'
})

module.exports = pool