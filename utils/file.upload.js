const multer = require('multer')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

exports.upload = (folderName) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const path = `static/${folderName}${req.body.name && `/${req.body.name}`}`
        fs.mkdirSync(path, { recursive: true })
        cb(null, `static/${folderName}${req.body.name && `/${req.body.name}`}`)
      },
      filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname))
      },
    }),
    limits: { fileSize: '10000000' },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif|svg|webp/
      const mimeType = fileTypes.test(file.mimetype)
      const extname = fileTypes.test(path.extname(file.originalname))

      if (mimeType && extname) {
        return cb(null, true)
      }
      cb('Укажите правильный формат файлов для загрузки')
    },
  })
}
