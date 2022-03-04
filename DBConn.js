var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_foglee',
  password        : '1696',
  database        : 'cs340_foglee'
});
module.exports.pool = pool;
