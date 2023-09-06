require('dotenv').config()
const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose')

app.get('/', (req, res) => {
    res.send('Hello, this is your Express server')
})

app.listen(port, () => {
    console.log(`Express sever is running on http://localhost:${port}`);
})

//Mongo username, password, database
const mongoUsername = process.env.MONGODB_USERNAME;
const mongoPassword = process.env.MONGODB_PASSWORD;
const mongoDatabase = process.env.MONGO_DATABASE;

//Mongo url
const mongoURL = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.ggo2lnw.mongodb.net/${mongoDatabase}?retryWrites=true&w=majority`

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    })