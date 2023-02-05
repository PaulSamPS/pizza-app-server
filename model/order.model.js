const { Schema, model } = require('mongoose')

const OrderSchema = new Schema(
  {
    pizza: { type: Schema.Types.ObjectId, ref: 'Pizza' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
  },
  { timestamps: true }
)

module.exports = model('Order', OrderSchema)
