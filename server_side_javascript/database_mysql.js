var mysql= require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'alstn2840',
  database : 'o2',
  port     : '3307'
});
conn.connect();

// var sql='SELECT * FROM topic';
// conn.query(sql,function(err,rows,fields){
//   if(err){
//     console.log(err);
//   } else{
//     for(var i=0;i<rows.length;i++){
//       console.log(rows[i].author);
//     }
//   }
// });

// var sql='INSERT INTO topic(title,description,author) VALUES(?,?,?)';
// var params=['Supervisor','Watcher','graphittie'];
// conn.query(sql,params,function(err,rows,fields){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(rows.insertId);
//   }
// });

// var sql='UPDATE topic SET title=?, author=? WHERE id=?';
// var params=['NPM','egoing',2];
// conn.query(sql,params,function(err,rows,fields){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(rows);
//   }
// });

var sql='DELETE FROM topic WHERE id=?';
var params=[2];
conn.query(sql,params,function(err,rows,fields){
  if(err){
    console.log(err);
  } else {
    console.log(rows);
  }
});

conn.end();
