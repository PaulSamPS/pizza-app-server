module.exports = class UserDto {
  id
  name
  phone
  role
  constructor(model) {
    this.id = model.id
    this.name = model.name
    this.phone = model.phone
    this.role = model.role
  }
}
