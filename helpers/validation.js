const { check } = require('express-validator');

exports.signUpValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter valid email id').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('image').custom((value, { req }) => {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            return true;
        } else {
            return false;
        }

    }).withMessage('Please uplad an image  type png ,jpg')
]