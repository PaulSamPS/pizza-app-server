const Product = require('../model/product.model')
const ApiError = require('../error/apiError')
class ProductController {
  async create(req, res, next) {
    try {
      let { name, price, description, badge, dough, sizes } = req.body
      const regular = req.files.regular[0].filename
      const slim = req.files.slim[0].filename
      console.log(sizes)

      const product = await Product.create({
        name,
        price,
        description,
        badge,
        img: {
          regular,
          slim,
        },
        dough,
        sizes,
      })

      res.status(200).send(product)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new ProductController()
