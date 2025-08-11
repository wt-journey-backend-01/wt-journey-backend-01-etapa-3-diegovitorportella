// controllers/agentesController.js - VERSÃO CONSISTENTE
const agentesRepository = require('../repositories/agentesRepository');
const errorHandler = require('../utils/errorHandler');

// Dentro de controllers/agentesController.js, ajuste a função getAllAgentes

async function getAllAgentes(req, res) {
  try {
    const agentes = await agentesRepository.getAllAgentes(req.query); // Passa a query para o repositório
    res.status(200).json(agentes);
  } catch (error) {
    errorHandler(res, error);
  }
}

// O resto do arquivo já está correto

async function getAgenteById(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID do agente inválido.' });
    
    const agente = await agentesRepository.getAgenteById(id);
    if (!agente) {
      return res.status(404).json({ error: 'Agente não encontrado' });
    }
    res.status(200).json(agente);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function createAgente(req, res) {
  try {
    const { nome, dataDeIncorporacao, cargo } = req.body;
    if (!nome || !dataDeIncorporacao || !cargo) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes: nome, dataDeIncorporacao e cargo' });
    }
    
    const agente = { nome, dataDeIncorporacao, cargo };
    const newAgente = await agentesRepository.createAgente(agente);
    res.status(201).json(newAgente);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function updateAgente(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID do agente inválido.' });

    const { nome, dataDeIncorporacao, cargo } = req.body;
    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios para atualização' });
    }
    
    const updatedAgente = await agentesRepository.updateAgente(id, { nome, dataDeIncorporacao, cargo });
    if (!updatedAgente) {
      return res.status(404).json({ error: 'Agente não encontrado' });
    }
    res.status(200).json(updatedAgente);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function deleteAgente(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID do agente inválido.' });

    const deleted = await agentesRepository.deleteAgente(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Agente não encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    errorHandler(res, error);
  }
}

async function getCasosByAgenteId(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID do agente inválido.' });

      const agente = await agentesRepository.getAgenteById(id);
      if(!agente) return res.status(404).json({ error: 'Agente não encontrado.' });
      
      const casos = await agentesRepository.getCasosByAgenteId(id);
      res.status(200).json(casos);
    } catch (error) {
      errorHandler(res, error);
    }
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  deleteAgente,
  getCasosByAgenteId
};