const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String, unique: true, required: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    role: { type: String, default: 'user' },
    birthday: {
      day: { type: Number },
      month: { type: String },
      year: { type: Number },
    },
  },
  { timestamps: true }
)

module.exports = model('User', UserSchema)
