const { Schema, model } = require('mongoose')

const OrderSchema = new Schema(
  {
    products: [
      {
        pizza: { type: Schema.Types.ObjectId, ref: 'Pizza' },
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        size: { type: String },
        dough: { type: String },
        qty: { type: Number },
        price: { type: Number },
      },
    ],
    address: { type: String },
    status: { type: String },
    orderNumber: { type: String },
    totalPrice: { type: Number },
    paymentMethod: { type: String },
  },
  { timestamps: true }
)

module.exports = model('Order', OrderSchema)
