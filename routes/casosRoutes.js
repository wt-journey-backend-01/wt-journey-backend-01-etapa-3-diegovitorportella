const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Lista todos os casos com filtros opcionais
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: agente_id
 *         schema:
 *           type: string
 *         description: Filtra casos por ID do agente.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtra casos por status ('aberto' ou 'solucionado').
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Busca por um termo no título ou descrição.
 *     responses:
 *       200:
 *         description: A lista de casos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caso'
 */
router.get('/casos', casosController.getAllCasos);

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       201:
 *         description: Caso criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       400:
 *         description: Dados inválidos.
 */
router.post('/casos', casosController.createCaso);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Retorna um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do caso
 *     responses:
 *       200:
 *         description: Os dados do caso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       404:
 *         description: Caso não encontrado.
 */
router.get('/casos/:id', casosController.getCasoById);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualiza um caso por completo
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso.
 *       404:
 *         description: Caso não encontrado.
 */
router.put('/casos/:id', casosController.updateCaso);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualiza um caso parcialmente
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso.
 *       404:
 *         description: Caso não encontrado.
 */
router.patch('/casos/:id', casosController.patchCaso);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Remove um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do caso
 *     responses:
 *       204:
 *         description: Caso removido com sucesso.
 *       404:
 *         description: Caso não encontrado.
 */
router.delete('/casos/:id', casosController.deleteCaso);

/**
 * @swagger
 * /casos/{caso_id}/agente:
 *   get:
 *     summary: Retorna o agente responsável por um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: caso_id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do caso
 *     responses:
 *       200:
 *         description: Os dados do agente responsável.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         description: Caso ou agente não encontrado.
 */
router.get('/casos/:caso_id/agente', casosController.getAgenteByCasoId);

module.exports = router;
