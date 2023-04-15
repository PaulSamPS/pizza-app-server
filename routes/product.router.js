const Router = require('express')
const router = new Router()
const productController = require('../controller/product.controller')
const fileUpload = require('../utils/file.upload')

router.post(
  '/pizza',
  fileUpload.upload('product').fields([
    { name: 'regular', maxCount: 1 },
    { name: 'slim', maxCount: 1 },
  ]),
  productController.createPizza
)
router.post('/product', fileUpload.upload('product').single('img'), productController.createProduct)

router.get('/pizza', productController.getAllPizzas)
router.get('/pizza/:pathname', productController.getOnePizza)
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOneProduct)

module.exports = router
