// routes/casosRoutes.js - VERSÃO CORRIGIDA
const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

// O prefixo '/casos' foi removido daqui.
router.get('/', casosController.getAllCasos);
router.post('/', casosController.createCaso);
router.get('/:id', casosController.getCasoById);
router.put('/:id', casosController.updateCaso);
router.patch('/:id', casosController.patchCaso);
router.delete('/:id', casosController.deleteCaso);
router.get('/:caso_id/agente', casosController.getAgenteByCasoId);

module.exports = router;