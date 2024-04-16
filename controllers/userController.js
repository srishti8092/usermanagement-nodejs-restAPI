const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const db = require('../config/db')


const register = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            })
        }

        const { name, email, password } = req.body;

        const sqlQueryForExistingUser = `SELECT email FROM users WHERE LOWER(email) = LOWER(?)`;
        const existingUser = await db.query(sqlQueryForExistingUser, [email]);

        if (existingUser) {
            return res.status(400).json({
                message: 'A user with this email already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        await db.query(insertQuery, [name, email, hashedPassword]);


        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = register