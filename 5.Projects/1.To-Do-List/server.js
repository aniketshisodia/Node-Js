const express = require('express');
const mongoose = require('mongoose');
const listRouter = require('./routes/listRouter');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Home Route');
});

app.use('/api/list', listRouter);

app.get('/api/list/add-task', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view', 'index.html'));
});
const PORT = 3000;

app.listen(3000, () => {
    console.log('Server is runnning');
})