const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true },
    description: { type: String },
    badge: { type: String, default: null },
    type: { type: String },
    pathname: { type: String },
    promotion: { type: Boolean, default: false },
    img: { type: String },
    price: { type: Number },
    weight: { type: String },
  },
  { timestamps: false }
)

module.exports = model('Product', ProductSchema)
