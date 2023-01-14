const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true },
    description: { type: String },
    type: { type: String },
    badge: { type: String, default: null },
    pathname: { type: String },
    promotion: { type: Boolean, default: false },
    img: { type: String },
    price: { type: Number },
    weight: { type: String, default: null },
  },
  { timestamps: false }
)

module.exports = model('Product', ProductSchema)
