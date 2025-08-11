const agentesRepository = require('../repositories/agentesRepository');
const errorHandler = require('../utils/errorHandler');

const getAllAgentes = async (req, res) => {
  try {
    const agentes = await agentesRepository.getAllAgentes();
    res.json(agentes);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAgenteById = async (req, res) => {
  try {
    const agente = await agentesRepository.getAgenteById(req.params.id);
    if (!agente) {
      return res.status(404).json({ message: 'Agente não encontrado' });
    }
    res.json(agente);
  } catch (error) {
    errorHandler(res, error);
  }
};

const createAgente = async (req, res) => {
  try {
    const newAgente = await agentesRepository.createAgente(req.body);
    res.status(201).json(newAgente);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAgente = async (req, res) => {
  try {
    const updatedAgente = await agentesRepository.updateAgente(
      req.params.id,
      req.body
    );
    if (!updatedAgente) {
      return res.status(404).json({ message: 'Agente não encontrado' });
    }
    res.json(updatedAgente);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteAgente = async (req, res) => {
  try {
    const deleted = await agentesRepository.deleteAgente(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Agente não encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCasosByAgenteId = async (req, res) => {
  try {
    const casos = await agentesRepository.getCasosByAgenteId(req.params.id);
    res.json(casos);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  deleteAgente,
  getCasosByAgenteId,
};