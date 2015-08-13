var express = require('express'),
	app = express(),
	http = require('http'),
	fs = require('fs');

app.use('/static', express.static(__dirname + '/static'));

app.get('/_ah/health', function(req, res) {
  res.status(200)
    .set('Content-Type', 'text/plain')
    .send('ok');
});

app.get('/_ah/start', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('ok');
});

app.get('/_ah/stop', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('ok');
  process.exit();
});

app.get('/*', function(req, res) {
	res.end(fs.readFileSync('index.html'));
});

http.createServer(app).listen(8080, function(err) {
	console.log('Express server running on port', 8080);
});
