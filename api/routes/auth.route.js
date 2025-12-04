const express = require('express');
const { loginFunc, signupFunc } = require('../controllers/auth.controller.js');

const router = express.Router();

router.post("/login", loginFunc)
router.post("/signup", signupFunc)

module.exports = router;