const ApiError = require('../error/apiError')
const tokenService = require('../service/token.service')
const cookieParser = require('cookie-parser')
const UserDto = require('../dto/user.dto')
const Token = require('../model/token.model')
const moment = require('moment')

const maxAge = 86400 * 100
const signed = true

class userController {
  async get(req, res, next) {
    const accessToken = cookieParser.signedCookie(req.headers.accesstoken, process.env.SECRET_COOKIE)
    const refreshToken = cookieParser.signedCookie(req.headers.refreshtoken, process.env.SECRET_COOKIE)
    if (!accessToken && !refreshToken) {
      return next(ApiError.unauthorized('Токены просрочены'))
    }

    if (!accessToken && refreshToken) {
      const validateToken = await tokenService.validateRefreshToken(refreshToken)
      if (validateToken) {
        if (Date.now() >= validateToken.exp * 1000) {
          return next(ApiError.unauthorized('Refresh токен просрочен'))
        }
        const userDto = new UserDto(validateToken)
        const newToken = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, newToken.accessToken)
        const newTokenValidate = await tokenService.validateAccessToken(newToken.accessToken)
        const token = await Token.findOne({ user: userDto.id })
        return res.json({ token: token.accessToken, exp: newTokenValidate.exp })
      }
    }

    if (accessToken && refreshToken) {
      const validateToken = await tokenService.validateAccessToken(accessToken)
      if (validateToken) {
        if (Date.now() >= validateToken.exp * 1000) {
          return next(ApiError.unauthorized('Токен просрочен'))
        }
        const userDto = new UserDto(validateToken)
        const token = await Token.findOne({ user: userDto.id })
        return res.json({ token: token.accessToken, exp: validateToken.exp })
      }
    }
  }
}

module.exports = new userController()
