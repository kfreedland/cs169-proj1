var express = require('express');

var app = express.createServer(express.logger());

var pg = require('pg');


app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.post('/users/login', function(request, response){
	response.send(JSON.stringify(request));
	pg.connect(process.env.DATABASE_URL, function(err, client) {
	var query = client.query('SELECT * FROM Users u WHERE u.password = '+request[password])+' and u.name = '+request[name];
	});
});

app.post('/users/add', function(request, response){
});

app.post('/TESTAPI/resetFixture', function(request, response){
});

app.post('/TESTAPI/unitTests', function(request, response){
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

/*

pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('SELECT * FROM your_table');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});*/