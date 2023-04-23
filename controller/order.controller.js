const Order = require('../model/order.model')

class OrderController {
  async get(req, res, next) {
    const { userId } = req.params
    const order = await Order.findOne({ user: userId }).populate(['orders.products.pizza', 'orders.products.product'])

    if (order) {
      return res.json(order)
    }

    return res.json(null)
  }

  async post(req, res, next) {
    const { userId, products, info, totalPrice } = req.body
    const user = await Order.findOne({ user: userId }).populate(['orders.products.pizza', 'orders.products.product'])
    if (user) {
      user.orders.unshift({
        products,
        info,
        status: 'Принят',
        orderNumber: '1',
        totalPrice: totalPrice,
        date: Date.now(),
      })
      await user.save()

      return res.json(user)
    }

    let userOrder = await Order.create({
      user: userId,
      orders: [],
    })

    const newOrderUser = await Order.findOne({ user: userOrder.user }).populate(['orders.products.pizza', 'orders.products.product'])
    newOrderUser.orders.unshift({
      products,
      info,
      status: 'Принят',
      orderNumber: '1',
      totalPrice: totalPrice,
      date: Date.now(),
    })

    await newOrderUser.save()

    return res.json(newOrderUser)
  }
}

module.exports = new OrderController()
