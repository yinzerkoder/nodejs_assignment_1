// Route handler alghoritm

// Define the handlers
const handlers = {};

// 'Hello' pathname handler
handlers.hello = ( data, callback ) => {
    // Callback a http status code, and a payload object
    callback(406, {'sayHi' : 'hello world'});
};

// Say hello everyone in hawaiian pathname handler
handlers.aloha = ( data,callback ) => {
    callback(406, { 'sayHi' : 'aloha ke akua'})
}

// Not found handler
handlers.notFound = ( data, callback ) => {
    callback(404);
};

// Define a request router
const router = {
    'hello' : handlers.hello,
    'aloha' : handlers.aloha,
    'notFound' : handlers.notFound
};

module.exports = router;