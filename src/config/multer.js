const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Caminho para a pasta 'uploads'
const uploadsPath = path.join(__dirname, 'uploads');

// Verificar se a pasta 'uploads' existe, e se não, criar
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log('Pasta "uploads" criada com sucesso.');
}

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Define a pasta de destino
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Cria um nome único para o arquivo
  }
});

// Validação do tipo de arquivo (imagens e vídeos)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|avi/;
  const isValidMimeType = allowedTypes.test(file.mimetype);
  const isValidExtname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isValidMimeType && isValidExtname) {
    cb(null, true); // Permite o upload do arquivo
  } else {
    cb(new Error('Apenas arquivos de imagem ou vídeo são permitidos.'), false); // Rejeita o upload
  }
};

// Limite de 10MB para os arquivos
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
  fileFilter: fileFilter
});

module.exports = upload;
