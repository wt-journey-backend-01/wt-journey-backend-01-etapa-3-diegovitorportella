const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4, validate: isUuid } = require('uuid'); // Importa a função de validação de UUID

// Função para listar todos os agentes, agora com filtros e ordenação
function getAllAgentes(req, res) {
    let agentes = agentesRepository.findAll();
    const { cargo, sort } = req.query;

    // Bónus: Filtra por cargo, se o parâmetro for fornecido
    if (cargo) {
        agentes = agentes.filter(agente => agente.cargo.toLowerCase() === cargo.toLowerCase());
    }

    // Bónus: Ordena por data de incorporação, se o parâmetro for fornecido
    if (sort) {
        if (sort.toLowerCase() === 'datadeincorporacao') {
            agentes.sort((a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao));
        } else if (sort.toLowerCase() === '-datadeincorporacao') {
            agentes.sort((a, b) => new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao));
        }
    }

    res.status(200).json(agentes);
}

// Função para buscar um agente por ID
function getAgenteById(req, res) {
    const { id } = req.params;

    // Validação: Verifica se o ID é um UUID válido
    if (!isUuid(id)) {
        return res.status(400).json({ message: 'O ID fornecido não é um UUID válido.' });
    }

    const agente = agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).json({ message: 'Agente não encontrado.' });
    }
    res.status(200).json(agente);
}

// Função para criar um novo agente, com validações
function createAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;
    const errors = {};

    // Validação de campos obrigatórios
    if (!nome) errors.nome = "O campo 'nome' é obrigatório.";
    if (!dataDeIncorporacao) errors.dataDeIncorporacao = "O campo 'dataDeIncorporacao' é obrigatório.";
    if (!cargo) errors.cargo = "O campo 'cargo' é obrigatório.";

    // Validação do formato da data
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dataDeIncorporacao && !dateRegex.test(dataDeIncorporacao)) {
        errors.dataDeIncorporacao = "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'.";
    }

    // Se houver erros, retorna a resposta de erro personalizada
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            status: 400,
            message: "Parâmetros inválidos",
            errors: errors
        });
    }

    const novoAgente = agentesRepository.create({ nome, dataDeIncorporacao, cargo });
    res.status(201).json(novoAgente);
}

// Função para atualizar um agente por completo (PUT)
function updateAgente(req, res) {
    const { id } = req.params;
    const { nome, dataDeIncorporacao, cargo } = req.body;
    
    // Validação: o corpo do PUT não deve permitir a alteração do ID
    if (req.body.id && req.body.id !== id) {
        return res.status(400).json({ message: "Não é permitido alterar o ID de um agente." });
    }
    
    const agenteAtualizado = agentesRepository.update(id, { nome, dataDeIncorporacao, cargo });

    if (!agenteAtualizado) {
        return res.status(404).json({ message: 'Agente não encontrado.' });
    }
    res.status(200).json(agenteAtualizado);
}

// Função para atualizar um agente parcialmente (PATCH)
function patchAgente(req, res) {
    const { id } = req.params;
    const novosDados = req.body;

    // Validação: o corpo do PATCH não deve permitir a alteração do ID
    if (novosDados.id) {
        return res.status(400).json({ message: "Não é permitido alterar o ID de um agente." });
    }

    const agenteAtualizado = agentesRepository.update(id, novosDados);

    if (!agenteAtualizado) {
        return res.status(404).json({ message: 'Agente não encontrado.' });
    }
    res.status(200).json(agenteAtualizado);
}

// Função para remover um agente
function deleteAgente(req, res) {
    const { id } = req.params;
    const deletado = agentesRepository.remove(id);

    if (!deletado) {
        return res.status(404).json({ message: 'Agente não encontrado.' });
    }
    res.status(204).send();
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    patchAgente,
    deleteAgente
};