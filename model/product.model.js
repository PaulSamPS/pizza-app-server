const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true },
    description: { type: String },
    badge: { type: String, default: null },
    type: { type: String },
    pathname: { type: String },
    promotion: { type: Boolean, default: false },
    img: {
      regular: { type: String },
      slim: { type: String },
    },
    price: [],
    dough: [],
    size: [],
    weight: {
      regular: { type: Array },
      slim: { type: Array },
    },
  },
  { timestamps: false }
)

module.exports = model('Product', ProductSchema)
