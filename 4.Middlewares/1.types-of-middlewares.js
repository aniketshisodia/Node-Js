const express = require('express');

const app = express();

// 1. Application Level Middleware
app.use((req, res, next) => {
    console.log(`Req method : ${req.method}, URL : ${req.url}`);
    next();
})

// 2. Route specific middleware
const checkAuth = (req, res, next) => {
    console.log('Checking Authorization');
    next();
}

// 3. Built-in Middlewares
app.use(express.json()); // allows reading JSON from request 


// 4. Error handling middleres

// it has 4 parameters instead of 3
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status('500').send('Something Broke');
    next();
})

app.get('/about', checkAuth, (req, res) => {
    res.send('<h1> I am ABOUT <h1>');
})


app.get('/', (req, res) => {
    res.send('Home page');
});

app.listen(3000, () => {
    console.log('Server is runnning at port 3000');
})