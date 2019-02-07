var express= require('express');
var session= require('express-session');
var bodyParser=require('body-parser');
var FileStore=require('session-file-store')(session);
var sha256=require('sha256');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

var app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: '1234DSFs@adf1234!@#$asd',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.get('/count',function(req,res){
  if(req.session.count){
    req.session.count++;
  } else{
    req.session.count=1;
  }
  res.send('count : '+req.session.count);
});
app.get('/auth/logout', function(req,res){
  delete req.session.displayName;
  req.session.save(function(){
    res.redirect('/welcome');
  });
});
app.get('/welcome',function(req,res){
  if(req.session.displayName){
    res.send(`
        <h1>Hello, ${req.session.displayName}</h1>
        <a href="/auth/logout">Logout</a>
      `);
  } else{
    res.send(`
        <h1>Welcome</h1>
        <ul>
          <li><a href="/auth/login">login</a></li>
          <li><a href="/auth/register">register</a></li>
        </ul>
      `);
  }
});
var users=[
  {
    username:'minsu',
    password:'ztXQAXzQdW7kDmJC8Kmq4tD+45VAkPSqgoryTaShhKDFPNRUsYWBURI+WShYg5vWdIVd7H8jH7Xo7Bcojviov1MBTvJqKqnOe4Snv7xWZYqXaQiqj62OgxrAerXbJgK6C8wbuEZKnVtIG8Bko50HvHWqT3gxcImBxt4kWl2UyCI=',
    salt:'l8SOoSFWuE8i99QaeS8TxnFQds2x+z9HkIighQTNqvhhflnIVbA9K1VSeAsoKK8/eso0t2H82Nrw+M4uSqUNsw==',
    displayName:'Minsu'
  }
];
app.post('/auth/register',function(req,res){
  hasher({password:req.body.password},function(err,pass,salt,hash){
    var user={
      username:req.body.username,
      password:hash,
      salt:salt,
      displayName:req.body.displayName
    };
    users.push(user);
    req.session.displayName=req.body.displayName;
    req.session.save(function(){
      res.redirect('/welcome');
    });
  });

});
app.get('/auth/register',function(req,res){
  var output=`
  <h1>Register</h1>
  <form action="/auth/register" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="text" name="displayName" placeholder="displayName">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `;
  res.send(output);
});
app.post('/auth/login',function(req,res){
  var uname=req.body.username;
  var pwd=req.body.password;
  for(var i=0;i<users.length;i++){
    var user=users[i];
    if(uname===user.username){
      return hasher({password:pwd,salt:user.salt},function(err,pass,salt,hash){
        if(hash===user.password){
          req.session.displayName=user.displayName;
          req.session.save(function(){
            res.redirect('/welcome');
          });
        } else{
          res.send('Who are you? <a href="/auth/login">login</a>');
        }
      });
    }
    // if(uname===user.username&&sha256(pwd+user.salt)===user.password){
    //   req.session.displayName=user.displayName;
    //   return req.session.save(function(){
    //     res.redirect('/welcome');
    //   });
    // }
  }
  res.send('Who are you? <a href="/auth/login">login</a>');
});
app.get('/auth/login',function(req,res){
  var output=`
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `;
  res.send(output);
});

app.listen(3003,function(){
  console.log('Connected 3003 port!!!');
});
