// controllers/casosController.js - VERSÃO DEFINITIVA
const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const errorHandler = require('../utils/errorHandler');

// Lista todos os casos, passando os filtros para o repositório
async function getAllCasos(req, res) {
    try {
        const casos = await casosRepository.getAllCasos(req.query);
        res.status(200).json(casos);
    } catch (error) {
        errorHandler(res, error);
    }
}

// Busca um caso específico por ID
async function getCasoById(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: 'ID do caso inválido.' });

        const caso = await casosRepository.getCasoById(id);
        if (!caso) return res.status(404).json({ message: 'Caso não encontrado.' });
        
        res.status(200).json(caso);
    } catch (error) {
        errorHandler(res, error);
    }
}

// Bônus: Retorna o agente responsável por um caso
async function getAgenteByCasoId(req, res) {
    try {
        const caso_id = parseInt(req.params.caso_id);
        if (isNaN(caso_id)) return res.status(400).json({ message: 'ID do caso inválido.' });

        const caso = await casosRepository.getCasoById(caso_id);
        if (!caso) return res.status(404).json({ message: 'Caso não encontrado.' });
        
        const agente = await agentesRepository.getAgenteById(caso.agente_id);
        if (!agente) return res.status(404).json({ message: 'Agente responsável não encontrado.' });
        
        res.status(200).json(agente);
    } catch (error) {
        errorHandler(res, error);
    }
}

// Cria um novo caso
async function createCaso(req, res) {
    try {
        const { titulo, descricao, status, agente_id } = req.body;
        
        if (!titulo || !descricao || !status || !agente_id) {
            return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
        }
        if (status !== 'aberto' && status !== 'solucionado') {
            return res.status(400).json({ message: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'." });
        }
        
        const agente = await agentesRepository.getAgenteById(agente_id);
        if (!agente) return res.status(404).json({ message: `Agente com ID ${agente_id} não encontrado.` });
        
        const novoCaso = await casosRepository.createCaso({ titulo, descricao, status, agente_id });
        res.status(201).json(novoCaso);
    } catch (error) {
        errorHandler(res, error);
    }
}

// Atualiza um caso (usado para PUT e PATCH)
async function updateCaso(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: 'ID do caso inválido.' });
        
        const dados = req.body;
        if (dados.status && (dados.status !== 'aberto' && dados.status !== 'solucionado')) {
            return res.status(400).json({ message: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'." });
        }

        const casoAtualizado = await casosRepository.updateCaso(id, dados);
        if (!casoAtualizado) return res.status(404).json({ message: 'Caso não encontrado.' });
        
        res.status(200).json(casoAtualizado);
    } catch (error) {
        errorHandler(res, error);
    }
}

// Remove um caso
async function deleteCaso(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: 'ID do caso inválido.' });

        const deletado = await casosRepository.deleteCaso(id);
        if (!deletado) return res.status(404).json({ message: 'Caso não encontrado.' });
        
        res.status(204).send();
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports = {
    getAllCasos,
    getCasoById,
    getAgenteByCasoId,
    createCaso,
    updateCaso,
    patchCaso: updateCaso, // Reutiliza a mesma lógica de update
    deleteCaso
};