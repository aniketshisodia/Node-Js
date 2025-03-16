const express = require('express');
const mongoose = require('mongoose');
const listRouter = require('./routes/listRouter');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Home Route');
});

app.use('/api/list', listRouter);

const PORT = 3000;

app.listen(3000, () => {
    console.log('Server is runnning');
})