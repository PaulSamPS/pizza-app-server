const { Schema, model } = require('mongoose')

const OrderSchema = new Schema(
  {
    user: { type: String },
    orders: [
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
        info: { type: Object },
        status: { type: String },
        orderNumber: { type: String },
        totalPrice: { type: Number },
        date: { type: Date },
      },
    ],
  },
  { timestamps: true }
)

module.exports = model('Order', OrderSchema)
