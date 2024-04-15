const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');
const app = express();

app.use(cors());

//error handling
app.use((err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message
    });
});


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
