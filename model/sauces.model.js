const { Schema, model } = require('mongoose')

const SaucesSchema = new Schema(
  {
    price: { type: Number },
    img: { type: String },
    name: { type: String },
  },
  { timestamps: false }
)

module.exports = model('Sauces', SaucesSchema)
