const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository'); // Importamos para o endpoint bônus

// Função para lidar com a requisição GET /casos
// Inclui a lógica para os endpoints bônus de filtro
function getAllCasos(req, res) {
    const { agente_id, status, q } = req.query;
    let casos = casosRepository.findAll();

    // Filtra por agente_id se o parâmetro for fornecido (Bônus)
    if (agente_id) {
        casos = casos.filter(caso => caso.agente_id === agente_id);
    }
    // Filtra por status se o parâmetro for fornecido (Bônus)
    if (status) {
        casos = casos.filter(caso => caso.status === status);
    }
    // Filtra por termo de busca (q) no título ou descrição (Bônus)
    if (q) {
        casos = casos.filter(caso =>
            caso.titulo.toLowerCase().includes(q.toLowerCase()) ||
            caso.descricao.toLowerCase().includes(q.toLowerCase())
        );
    }

    res.status(200).json(casos);
}

// Função para lidar com a requisição GET /casos/:id
function getCasoById(req, res) {
    const { id } = req.params;
    const caso = casosRepository.findById(id);

    if (!caso) {
        return res.status(404).json({ message: 'Caso não encontrado' });
    }
    res.status(200).json(caso);
}

// Função para o endpoint bônus GET /casos/:caso_id/agente
function getAgenteByCasoId(req, res) {
    const { caso_id } = req.params;
    const caso = casosRepository.findById(caso_id);
    if (!caso) {
        return res.status(404).json({ message: 'Caso não encontrado' });
    }

    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
        return res.status(404).json({ message: 'Agente responsável não encontrado' });
    }
    res.status(200).json(agente);
}


// Função para lidar com a requisição POST /casos
function createCaso(req, res) {
    const caso = req.body;

    // Validação para o campo 'status' (Regra de negócio)
    if (caso.status !== 'aberto' && caso.status !== 'solucionado') {
        return res.status(400).json({
            status: 400,
            message: "Parâmetros inválidos",
            errors: [
                "status: O campo 'status' pode ser somente 'aberto' ou 'solucionado'"
            ]
        });
    }
    const novoCaso = casosRepository.create(caso);
    res.status(201).json(novoCaso);
}

// Função para lidar com a requisição PUT /casos/:id
function updateCaso(req, res) {
    const { id } = req.params;
    const caso = req.body;
    const casoAtualizado = casosRepository.update(id, caso);
    if (!casoAtualizado) {
        return res.status(404).json({ message: 'Caso não encontrado' });
    }
    res.status(200).json(casoAtualizado);
}

// Função para lidar com a requisição PATCH /casos/:id
function patchCaso(req, res) {
    const { id } = req.params;
    const caso = req.body;
    const casoAtualizado = casosRepository.update(id, caso);
    if (!casoAtualizado) {
        return res.status(404).json({ message: 'Caso não encontrado' });
    }
    res.status(200).json(casoAtualizado);
}

// Função para lidar com a requisição DELETE /casos/:id
function deleteCaso(req, res) {
    const { id } = req.params;
    const deletado = casosRepository.remove(id);
    if (!deletado) {
        return res.status(404).json({ message: 'Caso não encontrado' });
    }
    res.status(204).send();
}

// Exporta as funções
module.exports = {
    getAllCasos,
    getCasoById,
    getAgenteByCasoId,
    createCaso,
    updateCaso,
    patchCaso,
    deleteCaso
};