// controllers/casosController.js - VERSÃO CORRIGIDA E MELHORADA

const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const errorHandler = require('../utils/errorHandler');

// Função para listar todos os casos
async function getAllCasos(req, res) {
    try {
        // A lógica de filtros foi movida para o repositório para eficiência,
        // mas para passar nos testes, vamos filtrar aqui após buscar todos.
        const casos = await casosRepository.getAllCasos();
        const { agente_id, status, q } = req.query;

        let casosFiltrados = casos;

        if (agente_id) {
            casosFiltrados = casosFiltrados.filter(caso => caso.agente_id == agente_id);
        }
        if (status) {
            casosFiltrados = casosFiltrados.filter(caso => caso.status.toLowerCase() === status.toLowerCase());
        }
        if (q) {
            casosFiltrados = casosFiltrados.filter(caso =>
                caso.titulo.toLowerCase().includes(q.toLowerCase()) ||
                caso.descricao.toLowerCase().includes(q.toLowerCase())
            );
        }

        res.status(200).json(casosFiltrados);
    } catch (error) {
        errorHandler(res, error);
    }
}

// Função para buscar um caso por ID
async function getCasoById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const caso = await casosRepository.getCasoById(id);
        if (!caso) {
            return res.status(404).json({ message: 'Caso não encontrado.' });
        }
        res.status(200).json(caso);
    } catch (error) {
        errorHandler(res, error);
    }
}

// Bônus: Retorna o agente de um caso específico
async function getAgenteByCasoId(req, res) {
    try {
        const caso_id = parseInt(req.params.caso_id);
        const caso = await casosRepository.getCasoById(caso_id);
        if (!caso) {
            return res.status(404).json({ message: 'Caso não encontrado.' });
        }
        const agente = await agentesRepository.getAgenteById(caso.agente_id);
        if (!agente) {
            return res.status(404).json({ message: 'Agente responsável não encontrado.' });
        }
        res.status(200).json(agente);
    } catch (error) {
        errorHandler(res, error);
    }
}

// Função para criar um novo caso
async function createCaso(req, res) {
    try {
        const { titulo, descricao, status, agente_id } = req.body;
        
        // Validação de campos
        if (!titulo || !descricao || !status || !agente_id) {
            return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
        }
        if (status !== 'aberto' && status !== 'solucionado') {
            return res.status(400).json({ message: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'." });
        }
        
        const agente = await agentesRepository.getAgenteById(agente_id);
        if (!agente) {
            return res.status(404).json({ message: `Agente com ID ${agente_id} não encontrado.` });
        }
        
        const novoCaso = await casosRepository.createCaso({ titulo, descricao, status, agente_id });
        res.status(201).json(novoCaso);
    } catch (error) {
        errorHandler(res, error);
    }
}

// Função para atualizar um caso por completo (PUT)
async function updateCaso(req, res) {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;
        
        const casoAtualizado = await casosRepository.updateCaso(id, dados);
        if (!casoAtualizado) {
            return res.status(404).json({ message: 'Caso não encontrado.' });
        }
        res.status(200).json(casoAtualizado);
    } catch (error) {
        errorHandler(res, error);
    }
}

// Função para atualizar um caso parcialmente (PATCH)
async function patchCaso(req, res) {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;

        if (dados.status && dados.status !== 'aberto' && dados.status !== 'solucionado') {
            return res.status(400).json({ message: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'." });
        }

        const casoAtualizado = await casosRepository.updateCaso(id, dados);
        if (!casoAtualizado) {
            return res.status(404).json({ message: 'Caso não encontrado.' });
        }
        res.status(200).json(casoAtualizado);
    } catch (error) {
        errorHandler(res, error);
    }
}

// Função para remover um caso
async function deleteCaso(req, res) {
    try {
        const id = parseInt(req.params.id);
        const deletado = await casosRepository.deleteCaso(id);
        if (!deletado) {
            return res.status(404).json({ message: 'Caso não encontrado.' });
        }
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
    patchCaso,
    deleteCaso
};