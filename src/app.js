const express = require('express');
const httpHelmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const {body, param, validationResult} = require('express-validator');
const httpCompression = require('compression');
const dotenv = require('dotenv').config();
const app = express();

const args = process.argv.slice(2);

//Compression Middleware
app.use(httpCompression());
//Compression Middleware

//Security Middleware
app.use(httpHelmet());
app.use(cors());
app.options('*', cors());

const requestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, //1 minute
    max: 50 // max 100 request per 1 minute
});

app.use(requestLimiter);
//Security Middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({message:'Hello World!'});
});

//Error Handling Middleware
app.use((req, res) => {
    console.log('Request Information:');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Query Parameters:', req.query);
    console.log('Params:', req.params);
    res.status(404).json({ message: 'Route not found!' });
});

app.use((err, req, res) => {
    console.error(err);
    // General Error Message
    res.status(500).json({ message: 'Internal Server Error' });
});
//Error Handling Middleware

//const PORT = dotenv.APP_PORT || 3000;
const PORT = args[0] && args.length > 0 && args[0] === "80" ? 80 : (dotenv.APP_PORT || 3000);

app.listen(PORT, () => {
    console.log('Server started on port : ' + PORT);
});

module.exports = app;