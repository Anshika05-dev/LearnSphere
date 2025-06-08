const express = require('express');
const router = express.Router();
// const User = require('../ models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const authcontroller = require('../controllers/authcontroller')


router.post('/register', authcontroller.register);
router.post('/login',authcontroller.login);

module.exports = router;
