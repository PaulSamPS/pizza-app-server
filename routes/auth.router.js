const Router = require('express')
const router = new Router()
const authController = require('../controller/auth.controller')

router.post('/send-code', authController.sendCode)
router.post('/enter-code', authController.enterCode)

module.exports = router
