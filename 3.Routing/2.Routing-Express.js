// Managing routes using EXPRESS.JS
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('home');
})

app.get('/about', (req, res) => {
    res.send('about');
})

app.listen(3000, () => {
    console.log('Server is runnning at port 3000');
})
