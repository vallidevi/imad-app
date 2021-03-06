var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var app = express();
app.use(morgan('combined'));
var config ={
    user:'vlldevi',
    datbase:'vlldevi',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/article-1',function (req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-1.html'));
});
var pool=new Pool(config);
app.get('/test-db',function (req,res){
    //make request
    pool.query('SELECT * FROM test',function (err,result)
    {
    if (err){
        res.status(500).send(err.toString());
    }else{
        res.send(JSON.stringify(result));
    }
    
    });
});
app.get('/article-2',function (req,res){
 res.sendFile(path.join(__dirname, 'ui', 'article-2.html'));
});
app.get('/article-3',function (req,res){
    res.send('this is my third article');
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
