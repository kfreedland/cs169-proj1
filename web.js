var express = require('express');

var app = express.createServer(express.logger());
app.use(express.bodyParser());
var pg = require('pg');


app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/user', function(request, response){
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		var query = client.query('SELECT * from users')
		query.on('row', function(result)
		{
			response.send(result);
		});
	});
});

app.post('/users/login', function(request, response){
	console.log("body"+request.body+"\n");

	var data = request.body;
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		response.send("password is"+data.password+"\n");
		var query = client.query('SELECT count FROM users u WHERE u.password = ' + data.password + ' and u.name = ' + data.user);
		var returnDict = {};
		query.on('row', function(result)
		{
			response.send("result is"+result+"\n")
			//response.send("test\n"+console.dir(result));
			if(!result)
			{
				returnDict = {"errCode":-1};
			}
			else
			{
				returnDict = {"errCode":1, "count":result};
			}	
		});
		response.send(returnDict);
	});
});
// app.post('/users/add', function(request, response){
// });

// app.post('/TESTAPI/resetFixture', function(request, response){
// });

// app.post('/TESTAPI/unitTests', function(request, response){
// });

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

/*

pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('SELECT * FROM your_table');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });*/
