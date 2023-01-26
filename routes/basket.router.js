const Router = require('express')
const router = new Router()
const basketController = require('../controller/basket.controller')

router.post('/add', basketController.addToBasket)
router.post('/decrease', basketController.decrease)
router.post('/increase-input', basketController.increase)
router.post('/delete-product', basketController.delete)
router.get('/clear', basketController.clear)
router.get('/', basketController.create)
router.get('/get', basketController.getBasket)

module.exports = router
