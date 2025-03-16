const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.end('Home Route');
    }
    else
        if (req.url == '/about') {
            res.end('About route');
        }
        else {
            res.end('Default Route');
        }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log('Server is Running at port 3000');
})