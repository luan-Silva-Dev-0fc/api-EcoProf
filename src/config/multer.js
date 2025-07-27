const multer = require('multer');

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // ✔️ Define a pasta de destino
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // ✔️ Cria um nome único para o arquivo
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
