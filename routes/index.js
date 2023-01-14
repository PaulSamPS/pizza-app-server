const Router = require('express')
const router = new Router()
const productRouter = require('./product.router')
const authRouter = require('./auth.router')

router.use('/product', productRouter)
router.use('/auth', authRouter)

module.exports = router
