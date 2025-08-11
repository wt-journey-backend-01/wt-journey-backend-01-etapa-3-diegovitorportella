const errorHandler = require('../utils/errorHandler');

// Simulando um banco em memória para exemplo
let agentes = [
  { id: 1, nome: 'Agente Alpha' },
  { id: 2, nome: 'Agente Bravo' }
];
let nextId = 3;

async function getAllAgentes(req, res) {
  try {
    res.status(200).json(agentes);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function getAgenteById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const agente = agentes.find(a => a.id === id);

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
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const newAgente = { id: nextId++, nome };
    agentes.push(newAgente);

    res.status(201).json(newAgente);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function updateAgente(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    const agenteIndex = agentes.findIndex(a => a.id === id);

    if (agenteIndex === -1) {
      return res.status(404).json({ error: 'Agente não encontrado' });
    }

    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    agentes[agenteIndex].nome = nome;

    res.status(200).json(agentes[agenteIndex]);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function deleteAgente(req, res) {
  try {
    const id = parseInt(req.params.id);
    const agenteIndex = agentes.findIndex(a => a.id === id);

    if (agenteIndex === -1) {
      return res.status(404).json({ error: 'Agente não encontrado' });
    }

    agentes.splice(agenteIndex, 1);

    res.status(204).send();
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  deleteAgente
};
