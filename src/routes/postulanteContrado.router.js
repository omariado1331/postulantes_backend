const express = require('express');
const router = express.Router();
const controller = require('../controllers/postulanteContratado.controller');

router.get('/', controller.findAll);

router.get('/:id', controller.findById);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

module.exports = router;
// This code defines the routes for managing "postulantes contratados".