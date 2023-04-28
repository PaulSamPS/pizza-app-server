const Router = require('express')
const router = new Router()
const orderController = require('../controller/order.controller')

router.post('/', orderController.post)
router.get('/:userId', orderController.get)
router.post('/history/:orderId', orderController.getOne)

module.exports = router
