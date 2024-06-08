const router = require('express').Router()

const authController = require('../controller/auth.controller')

router.post('/auth/login', authController.loginUser)
router.post("/auth/register", authController.insertUsers);

module.exports = router