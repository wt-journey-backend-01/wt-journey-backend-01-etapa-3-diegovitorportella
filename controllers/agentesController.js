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
    // Pegamos os dados do corpo da requisição
    const { nome, dataDeIncorporacao, cargo } = req.body;

    // Validação simples para garantir que os campos necessários existem
    if (!nome || !dataDeIncorporacao || !cargo) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes: nome, dataDeIncorporacao e cargo' });
    }
    
    // **A CORREÇÃO ESTÁ AQUI**
    // Criamos o objeto 'agente' com os dados corretos que o repositório espera
    const agente = { nome, dataDeIncorporacao, cargo };

    // Passamos o objeto 'agente' para a função de criar
    const newAgente = await agentesRepository.createAgente(agente);
    
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
  
      if (!casos || casos.length === 0) {
        // Retorna 404 se o agente não for encontrado ou não tiver casos
        const agente = await agentesRepository.getAgenteById(id);
        if(!agente) return res.status(404).json({ error: 'Agente não encontrado.' });
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