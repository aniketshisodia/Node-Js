// Creating server using Express js.

/*
Creating a server means setting up software that listens for client requests and responds accordingly.
This can be done using various technologies like Node.js, Python, Java, PHP, etc.
*/

const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send("Hello world");
})

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})