const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true },
    description: { type: String },
    price: { type: Number, defaultValue: 0 },
    badge: { type: String, defaultValue: null },
    img: {
      regular: { type: String },
      slim: { type: String },
    },
    dough: [],
    sizes: [],
  },
  { timestamps: false }
)

module.exports = model('Product', ProductSchema)
