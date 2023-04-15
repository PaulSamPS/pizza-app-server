const Order = require('../model/order.model')

class OrderController {
  async get(req, res, next) {
    const { userId } = req.params
    const user = await Order.findOne({ user: userId }).populate(['orders.products.pizza', 'orders.products.product'])

    if (user) {
      console.log(user)
      return res.json(user)
    }

    return res.json(null)
  }

  async post(req, res, next) {
    const { userId, products, info, totalPrice } = req.body
    const user = await Order.findOne({ user: userId }).populate(['orders.products.pizza', 'orders.products.product'])
    if (user) {
      user.orders.push({
        products,
        info,
        status: 'Принят',
        orderNumber: '1',
        totalPrice: totalPrice,
        date: Date.now(),
      })
      await user.save()

      console.log(user, '1')
      return res.json(user)
    }

    let userOrder = await Order.create({
      user: userId,
      orders: [],
    })

    const newOrderUser = await Order.findOne({ user: userOrder.user }).populate(['orders.products.pizza', 'orders.products.product'])
    newOrderUser.orders.push({
      products,
      info,
      status: 'Принят',
      orderNumber: '1',
      totalPrice: totalPrice,
      date: Date.now(),
    })

    await newOrderUser.save()

    console.log(newOrderUser, '2')
    return res.json(newOrderUser)
  }
}

module.exports = new OrderController()
