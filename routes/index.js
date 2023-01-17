const Router = require('express')
const router = new Router()
const productRouter = require('./product.router')
const authRouter = require('./auth.router')
const userRouter = require('./user.router')

router.use('/product', productRouter)
router.use('/auth', authRouter)
router.use('/user', userRouter)

module.exports = router
