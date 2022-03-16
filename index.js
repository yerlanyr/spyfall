const static = require('node-static');

const file = new static.Server('./src', {gzip: true, cache: 7200});

require('http').createServer(function(request, response) {
    request.addListener('end', function(){
        file.serve(request, response);
    }).resume();
}).listen(process.env.PORT || 3000);