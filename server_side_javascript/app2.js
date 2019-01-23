var express=require('express');
var app=express();

app.get('/',function(req, res){
  res.send(`<style>
    h1{color:blue;}
    li{font-size:30px;}
    </style>
    <h1>Welcome My Home</h1>
    <ul>
    <li><a href="http://www.naver.com" target="_blank">Node.js</a></li>
    <li><a href="http://www.google.com" target="_blank">Express</a></li>
    <li><a href="http://localhost:5252/login" target="_blank">Login</a></li>
    </ul>`);
});
app.get('/login',function(req, res){
  res.send(`<style>
    h2{color:blue;}
    body{padding:100px;
      padding-left:380px;
        border:4px;
        margin:30px;
        float:center;
    }
    </style>
    <body>
    <h2>로그인 하십시오</h2>
    <p><input type="text" placeholder="아이디를 입력하세요"></p>
    <p><input type="password" placeholder="비밀번호를 입력하세요"></p>
    <p><input type="button" value="Login!"></p>
    </body>
    `);
});

app.listen(5252,function(){
  console.log('Connected! http://localhost:5252');
});
