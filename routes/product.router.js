const Router = require('express')
const router = new Router()
const productController = require('../controller/product.controller')
const fileUpload = require('../utils/file.upload')

router.post(
  '/',
  fileUpload.upload('product').fields([
    { name: 'regular', maxCount: 1 },
    { name: 'slim', maxCount: 1 },
  ]),
  productController.create
)
router.get('/', productController.getAll)

module.exports = router
