const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository'); // Importa o repositório de agentes para validação
const { validate: isUuid } = require('uuid'); // Importa a função de validação de UUID

// Função para listar todos os casos, com busca mais segura
function getAllCasos(req, res) {
    let casos = casosRepository.findAll();
    const { agente_id, status, q } = req.query;

    // Filtra por agente_id
    if (agente_id) {
        casos = casos.filter(caso => caso.agente_id === agente_id);
    }
    // Filtra por status
    if (status) {
        casos = casos.filter(caso => caso.status && caso.status.toLowerCase() === status.toLowerCase());
    }
    // Bónus: Filtra por termo de busca no título ou descrição
    if (q) {
        casos = casos.filter(caso =>
            (caso.titulo && caso.titulo.toLowerCase().includes(q.toLowerCase())) ||
            (caso.descricao && caso.descricao.toLowerCase().includes(q.toLowerCase()))
        );
    }

    res.status(200).json(casos);
}

// Função para buscar um caso por ID
function getCasoById(req, res) {
    const { id } = req.params;
    if (!isUuid(id)) {
        return res.status(400).json({ message: 'O ID fornecido não é um UUID válido.' });
    }
    const caso = casosRepository.findById(id);
    if (!caso) {
        return res.status(404).json({ message: 'Caso não encontrado.' });
    }
    res.status(200).json(caso);
}

// Bónus: Retorna o agente de um caso específico
function getAgenteByCasoId(req, res) {
    const { caso_id } = req.params;
    const caso = casosRepository.findById(caso_id);
    if (!caso) {
        return res.status(404).json({ message: 'Caso não encontrado.' });
    }
    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
        return res.status(404).json({ message: 'Agente responsável não encontrado.' });
    }
    res.status(200).json(agente);
}

// Função para criar um novo caso, com validações robustas
function createCaso(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;
    const errors = {};

    // Validação de campos obrigatórios
    if (!titulo) errors.titulo = "O campo 'titulo' é obrigatório.";
    if (!descricao) errors.descricao = "O campo 'descricao' é obrigatório.";
    if (!status) errors.status = "O campo 'status' é obrigatório.";
    if (!agente_id) errors.agente_id = "O campo 'agente_id' é obrigatório.";

    // Validação do status
    if (status && status !== 'aberto' && status !== 'solucionado') {
        errors.status = "O campo 'status' pode ser somente 'aberto' ou 'solucionado'.";
    }

    // Validação da existência do agente
    if (agente_id) {
        const agente = agentesRepository.findById(agente_id);
        if (!agente) {
            // Este erro é 404, pois o recurso (agente) não foi encontrado.
            return res.status(404).json({ message: `Agente com ID ${agente_id} não encontrado.` });
        }
    }
    
    // Se houver erros de validação (400)
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            status: 400,
            message: "Parâmetros inválidos",
            errors: errors
        });
    }

    const novoCaso = casosRepository.create({ titulo, descricao, status, agente_id });
    res.status(201).json(novoCaso);
}

// Função para atualizar um caso por completo (PUT)
function updateCaso(req, res) {
    const { id } = req.params;
    const { titulo, descricao, status, agente_id } = req.body;

    // Validação para não permitir alteração de ID
     if (req.body.id && req.body.id !== id) {
        return res.status(400).json({ message: "Não é permitido alterar o ID de um caso." });
    }

    const casoAtualizado = casosRepository.update(id, { titulo, descricao, status, agente_id });

    if (!casoAtualizado) {
        return res.status(404).json({ message: 'Caso não encontrado.' });
    }
    res.status(200).json(casoAtualizado);
}

// Função para atualizar um caso parcialmente (PATCH)
function patchCaso(req, res) {
    const { id } = req.params;
    const novosDados = req.body;

    // Validação para não permitir alteração de ID
    if (novosDados.id) {
        return res.status(400).json({ message: "Não é permitido alterar o ID de um caso." });
    }

    // Validação de status, se ele estiver sendo alterado
    if (novosDados.status && novosDados.status !== 'aberto' && novosDados.status !== 'solucionado') {
        return res.status(400).json({
            status: 400,
            message: "Parâmetros inválidos",
            errors: { status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'." }
        });
    }

    const casoAtualizado = casosRepository.update(id, novosDados);

    if (!casoAtualizado) {
        return res.status(404).json({ message: 'Caso não encontrado.' });
    }
    res.status(200).json(casoAtualizado);
}

// Função para remover um caso
function deleteCaso(req, res) {
    const { id } = req.params;
    const deletado = casosRepository.remove(id);

    if (!deletado) {
        return res.status(404).json({ message: 'Caso não encontrado.' });
    }
    res.status(204).send();
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