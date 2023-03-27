const Router = require('express')
const router = new Router()
const basketController = require('../controller/basket.controller')

router.post('/add-product', basketController.addProductToBasket)
router.post('/add-pizza', basketController.addPizzaToBasket)
router.post('/decrease', basketController.decrease)
router.post('/increase', basketController.increase)
router.post('/delete', basketController.delete)
router.get('/clear', basketController.clear)
router.get('/', basketController.create)
router.get('/get', basketController.getBasket)

module.exports = router
