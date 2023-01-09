const Pizza = require('../model/pizza.model')
const Product = require('../model/product.model')
const ApiError = require('../error/apiError')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
class ProductController {
  async createPizza(req, res, next) {
    try {
      let { name, price, description, badge, dough, size, weight, promotion, type, pathname } = req.body

      const regular = req.files.regular[0].filename
      const slim = req.files.slim[0].filename

      const pizza = await Pizza.create({
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

      res.status(200).send(pizza)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async createProduct(req, res, next) {
    try {
      let { name, price, description, badge, size, weight, promotion, type, pathname } = req.body
      const { filename: img } = req.file
      console.log(req.file)

      const product = await Product.create({
        name,
        price,
        description,
        badge,
        promotion,
        type,
        pathname,
        img: req.file.filename,
        size,
        weight,
      })

      res.status(200).send(product)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAllPizzas(req, res, next) {
    try {
      const pizzas = await Pizza.find()
      return res.json(pizzas)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getOnePizza(req, res, next) {
    try {
      const { id } = req.params
      const pizza = await Pizza.findOne({ pathname: id })
      return res.json(pizza)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new ProductController()
