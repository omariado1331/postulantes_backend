const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
// Middleware para manejar la subida de archivos PDF
const controller = require('../controllers/postulante.controller');



router.post('/', upload.single('curriculum'), controller.create);

router.get('/', controller.findAll);

router.get('/:id', controller.findById);

router.put('/:id', controller.update);

module.exports = router;