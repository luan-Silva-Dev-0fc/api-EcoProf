const express = require('express')
const router = express.Router()
const controller = require('../controllers/atualizarPerfilController')
const autenticarUsuario = require('../middleware/auth')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname)
    const nomeArquivo = Date.now() + extensao
    cb(null, nomeArquivo)
  }
})

const upload = multer({ storage })

router.put('/', autenticarUsuario, upload.single('foto'), controller.atualizarPerfil)

module.exports = router
