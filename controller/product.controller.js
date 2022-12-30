const Product = require('../model/product.model')
const ApiError = require('../error/apiError')
class ProductController {
  async create(req, res, next) {
    try {
      let { name, price, description, badge, dough, size, weight, promotion, type, pathname } = req.body
      const regular = req.files.regular[0].filename
      const slim = req.files.slim[0].filename

      const product = await Product.create({
        name,
        price,
        description,
        badge,
        promotion,
        type,
        pathname,
        img: {
          regular,
          slim,
        },
        dough,
        size,
        weight: {
          regular: weight.regular,
          slim: weight.slim,
        },
      })

      res.status(200).send(product)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await Product.find()
      return res.json(products)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const { pathname } = req.params
      const product = await Product.findOne({ pathname })
      return res.json(product)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new ProductController()
