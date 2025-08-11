const agentesRepository = require('../repositories/agentesRepository');
const errorHandler = require('../utils/errorHandler');

async function getAllAgentes(req, res) {
  try {
    const agentes = await agentesRepository.getAllAgentes();
    res.status(200).json(agentes);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function getAgenteById(req, res) {
  try {
    const id = parseInt(req.params.id);
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
      return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, dataDeIncorporacao, cargo' });
    }

    const newAgente = await agentesRepository.createAgente({ nome, dataDeIncorporacao, cargo });
    res.status(201).json(newAgente);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function updateAgente(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios para atualização: nome, dataDeIncorporacao, cargo' });
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
      const casos = await agentesRepository.getCasosByAgenteId(id);
  
      if (!casos) {
        return res.status(404).json({ error: 'Agente não encontrado ou não possui casos.' });
      }
  
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