const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

router.get('/', agentesController.getAllAgentes);
router.get('/:id', agentesController.getAgenteById);
router.post('/', agentesController.createAgente);
router.put('/:id', agentesController.updateAgente);
router.delete('/:id', agentesController.deleteAgente);
router.get('/:id/casos', agentesController.getCasosByAgenteId); // Bônus

module.exports = router;