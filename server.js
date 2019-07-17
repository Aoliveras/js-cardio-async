const http = require('http'); // import HTTP node module
const url = require('url');
const db = require('./db');

const server = http.createServer(); // creates server

// Listens for the "request" event on our server
// The event will be fired anytime some client makes a request
// Takes a callback with request and response
// request is what the client sent us
// response is what we send back
server.on('request', (request, response) => {
  // check if request was a get to '/' route
  if (request.url === '/' && request.method === 'GET') {
    // sets status code and writes the header
    response.writeHead(200, {
      'My-custom-header': 'This is a great API',
    });
    // Sending the response to the client with data
    response.end('Welcome to the Mainframe');
    return;
  }

  if (request.url === '/status' && request.method === 'GET') {
    const status = {
      isUp: true,
      owner: 'Adam',
      timestamp: Date.now(),
    };
    response.writeHead(200, {
      'Content-Type': 'application.json',
      'Another-Header': 'SuperCool',
    });
    return response.end(JSON.stringify(status));
  }

  const parsedUrl = url.parse(request.url, true);
  console.log(parsedUrl);
  if (parsedUrl.pathname === '/set' && request.method === 'PATCH') {
    return db
      .set(parsedUrl.query.file, parsedUrl.query.key, parsedUrl.query.value)
      .then(() => {
        response.end('Value set!');
      })
      .catch(err => {
        // TODO: Handle errors
      });
    // Fire off the db set method
  }
});

server.listen(5000, () => console.log('Server listening on port 5000'));
