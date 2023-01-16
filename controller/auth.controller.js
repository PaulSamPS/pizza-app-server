const User = require('../model/user.model')
const ApiError = require('../error/apiError')
const Code = require('../model/code.model')
const tokenService = require('../service/token.service')
const UserDto = require('../dto/user.dto')
const moment = require('moment')

class AuthController {
  async sendCode(req, res, next) {
    try {
      const { phone } = req.body
      const user = await User.findOne({ phone: phone })
      // const code = await axios.get(`https://sms.ru/code/call?phone=${phone}&api_id=${process.env.SMS_API_KEY}`)
      const code = Math.floor(1000 + Math.random() * 9000)

      if (!user) {
        const newUser = await User.create({ phone })
        const userCode = await Code.create({ user: newUser._id, code: code })
        return res.json({ userId: newUser._id, date: userCode.updatedAt })
      }

      const userCode = await Code.findOne({ user: user._id })

      if (!userCode) {
        await Code.create({ user: user._id, code: code })
        return res.json({ userId: user._id, date: userCode.updatedAt })
      }

      if (moment(userCode.updatedAt).add('2', 'minutes').format('h:mm:ss') > moment(Date.now()).format('h:mm:ss')) {
        const millis = Math.abs(moment(userCode.updatedAt).add('2', 'minutes') - Date.now())
        const minutes = Math.floor(millis / 60000)
        const seconds = ((millis % 60000) / 1000).toFixed(0)
        return next(ApiError.internal(`Повторная отправка возможна через: ${minutes + ':' + (seconds < 10 ? '0' : '') + seconds}`))
      }

      userCode.code = code
      await userCode.save()

      return res.json({ userId: user._id, date: userCode.updatedAt })
    } catch (e) {
      return next(ApiError.unauthorized('ошибка отправки кода'))
    }
  }

  async enterCode(req, res, next) {
    const { code, userId } = req.body
    const findCode = await Code.findOne({ user: userId.toString(), code: code }).populate('user')

    if (findCode) {
      const userDto = new UserDto(findCode.user)
      const token = tokenService.generateTokens({ ...userDto })
      await tokenService.saveToken(findCode.user._id, token.accessToken, token.refreshToken)
      res.cookie('refreshToken', token.refreshToken, {
        maxAge: 30 * 86400 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        signed: true,
      })
      res.cookie('accessToken', token.accessToken, {
        maxAge: 86400 * 100,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        signed: true,
      })
      await Code.findOneAndDelete({ user: userId.toString(), code: code }).populate('user')
      return res.json({ token: token.accessToken })
    } else {
      return next(ApiError.forbidden('Неверный код'))
    }
  }
}

module.exports = new AuthController()
