const express = require('express');
const router = express.Router();
const { signUpValidation } = require('../helpers/validation')
const userController = require('../controllers/userController')
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') ?
        cb(null, true) : cb(null, false);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

router.post('/register', upload.single('image'), signUpValidation, userController);

module.exports = router;
