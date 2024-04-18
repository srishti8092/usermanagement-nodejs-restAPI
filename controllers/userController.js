const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const db = require('../config/db')
const randomString = require('randomstring');
const sendMail = require('../helpers/sendMail')

const register = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            })
        }

        const { name, email, password } = req.body;
        const image = req.body.filename;
        console.log('image', image)

        const sqlQueryForExistingUser = `SELECT email FROM users WHERE LOWER(email) = LOWER(?)`;
        const existingUser = await db.query(sqlQueryForExistingUser, [email]);

        if (existingUser) {
            return res.status(400).json({
                message: 'A user with this email already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = `INSERT INTO users (name, email, password,image) VALUES (?, ?, ?, ?)`;
        await db.query(insertQuery, [name, email, hashedPassword, image]);

        let mailSubject = 'Mail Verification';
        const randomToken = randomString.generate();
        let content = '<p>Hi ' + req.body.name + ', \
        Please <a href="http://localhost:5000/api/mail-verification?token='+ randomToken + '"> verify</a> your mail </p>';
        sendMail(email, mailSubject, content);

        await db.query(`UPDATE users set token=-? where email=?`, [randomToken, email], function (error, result) {
            if (error) {
                return res.status(400).send({
                    message: error
                });
            }
        })
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = register