const Basket = require('../model/basket.model')
const cookieParser = require('cookie-parser')

let basketId

const maxAge = 30 * 86400 * 1000
const signed = true

const regexpId = (cookie) => {
  const basket = cookieParser.signedCookie(cookie, process.env.SECRET_COOKIE)
  return basket.split(/\"(.*?)\"/g)[1]
}

class BasketController {
  async getBasket(req, res) {
    if (req.signedCookies.basket) {
      basketId = req.signedCookies.basket
      const basket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])
      return res.json(basket)
    }
  }

  async create(req, res) {
    if (req.signedCookies.basket) {
      basketId = req.signedCookies.basket
      const basket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])
      res.cookie('basket', basketId, { maxAge, signed })
      return res.json(basket)
    }

    if (!req.signedCookies.basket) {
      let created = await Basket.create({ products: [], totalPrice: 0 })
      basketId = created._id
      const basket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])
      res.cookie('basket', basketId, { maxAge, signed })
      return res.json(basket)
    }
  }

  async addToBasket(req, res) {
    const { productId, productPrice } = req.body

    if (req.signedCookies.basket) {
      basketId = req.signedCookies.basket
      const basket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])
      const product = basket.products.find((p) => p.product.toString() === productId)

      if (product) {
        product.qty += 1
        basket.totalPrice += Number(productPrice)
        await basket.save()
        const newBasket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])
        return res.json(newBasket)
      } else {
        basket.products.push({ product: productId, qty: 1 })
        basket.totalPrice += Number(productPrice)
        await basket.save()
        const newBasket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])
        return res.json(newBasket)
      }
    } else {
      let created = await Basket.create({ products: [], totalPrice: 0 })
      basketId = created._id
      res.cookie('basket', basketId, { maxAge, signed })
      const newBasket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])
      newBasket.products.push({ product: productId, qty: 1 })
      newBasket.totalPrice += Number(productPrice)
      await newBasket.save()

      return res.json(newBasket)
    }
  }

  async decrease(req, res) {
    const { productId, productPrice } = req.body
    if (req.signedCookies.basket) {
      basketId = req.signedCookies.basket
      const basket = await Basket.findById(basketId).populate('products')
      const product = basket.products.find((p) => p.product.toString() === productId)

      if (product) {
        if (product.qty > 1) {
          product.qty -= 1
          basket.totalPrice -= Number(productPrice)
          await basket.save()
        }
        const newBasket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])
        return res.json(newBasket)
      }
    }
  }

  async increase(req, res) {
    const { productId } = req.body
    basketId = req.signedCookies.basket

    const basket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])
    const product = basket.products.find((p) => p.product.toString() === productId)

    if (product) {
      if (product.qty > 1) {
        product.qty += 1
        basket.totalPrice += product.product.price
        await basket.save()
      }
      const newBasket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])

      return res.json(newBasket)
    }
  }

  async delete(req, res) {
    const { productId } = req.body
    basketId = req.signedCookies.basket
    const basket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])
    const product = basket.products.find((p) => p.product.toString() === productId)

    basket.totalPrice -= product.product.price * product.qty
    basket.products = basket.products.filter((p) => p.product.toString() !== productId)

    await basket.save()
    const newBasket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])

    return res.json(newBasket)
  }

  async clear(req, res) {
    basketId = req.signedCookies.basket
    const basket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])
    basket.products = []
    basket.totalPrice = 0

    await basket.save()
    const newBasket = await Basket.findById(basketId).populate(['products.product', 'products.pizza'])

    return res.json(newBasket)
  }
}

module.exports = new BasketController()
