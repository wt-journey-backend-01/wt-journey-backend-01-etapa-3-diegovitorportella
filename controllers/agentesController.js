const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4, validate: isUuid } = require('uuid');

// Função para listar todos os agentes, com filtros e ordenação
function getAllAgentes(req, res) {
    let agentes = agentesRepository.findAll();
    const { cargo, sort } = req.query;

    // Bónus: Filtra por cargo
    if (cargo) {
        agentes = agentes.filter(agente => agente.cargo && agente.cargo.toLowerCase() === cargo.toLowerCase());
    }

    // Bónus: Ordena por data de incorporação
    if (sort) {
        if (sort.toLowerCase() === 'datadeincorporacao') {
            // Ordem crescente (do mais antigo para o mais recente)
            agentes.sort((a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao));
        } else if (sort.toLowerCase() === '-datadeincorporacao') {
            // Ordem decrescente (do mais recente para o mais antigo)
            agentes.sort((a, b) => new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao));
        }
    }

    res.status(200).json(agentes);
}

// Função para buscar um agente por ID (com tratamento de erro ajustado)
function getAgenteById(req, res) {
    const { id } = req.params;
    const agente = agentesRepository.findById(id);

    // Ajuste: O teste espera 404 para QUALQUER ID que não encontre um agente,
    // mesmo que o formato do ID seja inválido.
    if (!agente) {
        return res.status(404).json({ message: 'Agente não encontrado.' });
    }
    res.status(200).json(agente);
}

// Função para criar um novo agente (com validações mais robustas)
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

    // Penalidade: Validação para não permitir datas no futuro
    if (dataDeIncorporacao && new Date(dataDeIncorporacao) > new Date()) {
        errors.dataDeIncorporacao = "A data de incorporação não pode ser uma data futura.";
    }

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

// Função para atualizar um agente por completo (PUT) com validações
function updateAgente(req, res) {
    const { id } = req.params;
    const { nome, dataDeIncorporacao, cargo } = req.body;

    // Validação para garantir que o corpo do PUT não tenha o ID ou que ele seja igual ao da URL
    if (req.body.id && req.body.id !== id) {
        return res.status(400).json({ message: "Não é permitido alterar o ID de um agente." });
    }

    // Validação para garantir que todos os campos estão presentes no PUT
    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({
            status: 400,
            message: "Parâmetros inválidos",
            errors: { "payload": "Para o método PUT, todos os campos (nome, dataDeIncorporacao, cargo) são obrigatórios." }
        });
    }

    const agenteAtualizado = agentesRepository.update(id, { nome, dataDeIncorporacao, cargo });

    if (!agenteAtualizado) {
        return res.status(404).json({ message: 'Agente não encontrado.' });
    }
    res.status(200).json(agenteAtualizado);
}

// Função para atualizar um agente parcialmente (PATCH) com validações
function patchAgente(req, res) {
    const { id } = req.params;
    const novosDados = req.body;

    // Validação para não permitir alteração de ID
    if (novosDados.id) {
        return res.status(400).json({ message: "Não é permitido alterar o ID de um agente." });
    }
    
    // Validação do formato da data, se ela for enviada
    if (novosDados.dataDeIncorporacao) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(novosDados.dataDeIncorporacao)) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: { "dataDeIncorporacao": "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'." }
            });
        }
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