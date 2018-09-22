/* All the server logic for both the http and https servers */


// Built-in and internal dependencies
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const router = require('./handlers');


const unifiedServer = ( req, res ) => {

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);
    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // Set the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP method
    const method = req.method.toLowerCase();


    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', data => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        // Choose the handler that this request should go to, if not found use notFound handler
        const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : router.notFound;
        //  Construct the data object to send to the handler
        const data = {
            'trimmedPath': trimmedPath,
            "queryStringObject": queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        /* Route the request to the handler specified in the router, response the status 
           code and payload if they are number and object respectively */
        chosenHandler(data, ( statusCode, payload ) => {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};
            // Stringify the payload
            const payloadString = JSON.stringify(payload);
            // Return the responses
            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log(`Returning this response:, ${statusCode, payloadString}`);
        });
    });
}

module.exports = unifiedServer;