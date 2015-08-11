var http2 = require('http2'),
	fs = require('fs'),
	path = require('path');

var options = {
	key: fs.readFileSync(__dirname + '/cert/local.key'),
	cert: fs.readFileSync(__dirname + '/cert/local.crt'),
};

http2.createServer(options, function(request, response) {
	var filename = path.join(__dirname, request.url);
	var ext = path.extname(filename);
	if(request.url == '/'){
		response.writeHead(200);
    	fs.createReadStream('index.html').pipe(response);
	}else if(fs.existsSync(filename)){
		if(ext === '.css'){
			response.setHeader("Content-Type", "text/css");
		}else if(ext === '.js'){
			response.setHeader("Content-Type", "application/javascript");
		}
		response.writeHead(200);
    	fs.createReadStream(filename).pipe(response);
	}else{
		response.writeHead(404);
    	response.end();
	}
}).listen(3000);


