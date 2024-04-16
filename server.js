const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
require('./config/db');

const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//routes
app.use('/api', userRoute)

//error handling
app.use((err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message
    });
});


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
