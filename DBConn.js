var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_bradychr',
  password        : '5520',
  database        : 'cs340_bradychr'
});
module.exports.pool = pool;
