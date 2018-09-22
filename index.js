/* Primary file for API */


// Built-in and internal dependencies
const http          = require('http'),
      https         = require('https'),
      fs            = require('fs'),
      config        = require('./config'),
      unifiedServer = require('./unifiedServer');


// Instantiate the HTTP server
const httpServer = http.createServer(( req,res ) => {
    unifiedServer(req,res);
});

// Start the HTTP server
httpServer.listen(config.httpPort, () => {
    console.log(`The server is listening on port ${config.httpPort}`);
});

/* ----------------------------------------------------------------------- */

// Instatiate the HTTPS server
const httpsServerOption = {
    'key' : fs.readFile('./https/key.pem'),
    'cert' : fs.readFile('./https/cert.pem')
};
const httpsServer = https.createServer(httpsServerOption, ( req, res ) => {
    unifiedServer(req, res);
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort, () => {
    console.log(`The server is listening on port ${config.httpsPort}`);
});


 
