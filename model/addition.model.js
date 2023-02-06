const { Schema, model } = require('mongoose')

const AdditionsSchema = new Schema(
  {
    price: { type: Number },
    img: { type: String },
    name: { type: String },
  },
  { timestamps: false }
)

module.exports = model('Additions', AdditionsSchema)
