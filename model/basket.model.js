const { Schema, model } = require('mongoose')

const BasketSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
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
    totalPrice: { type: Number },
  },
  { timestamps: true }
)

module.exports = model('Basket', BasketSchema)
