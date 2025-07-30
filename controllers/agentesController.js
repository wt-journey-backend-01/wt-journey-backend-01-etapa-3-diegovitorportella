const agentesRepository = require('../repositories/agentesRepository');

// Função para lidar com a requisição GET /agentes
function getAllAgentes(req, res) {
    // Pega os dados do repositório
    const agentes = agentesRepository.findAll();
    // Envia a resposta com status 200 OK e os dados em JSON
    res.status(200).json(agentes);
}

// Função para lidar com a requisição GET /agentes/:id
function getAgenteById(req, res) {
    // Pega o ID dos parâmetros da rota
    const { id } = req.params;
    const agente = agentesRepository.findById(id);

    // Se o agente não for encontrado, retorna 404
    if (!agente) {
        return res.status(404).json({ message: 'Agente não encontrado' });
    }
    // Se encontrar, retorna 200 OK com os dados do agente
    res.status(200).json(agente);
}

// Função para lidar com a requisição POST /agentes
function createAgente(req, res) {
    // Pega os dados do corpo da requisição
    const agente = req.body;
    const novoAgente = agentesRepository.create(agente);
    // Retorna 201 Created com os dados do novo agente
    res.status(201).json(novoAgente);
}

// Função para lidar com a requisição PUT /agentes/:id (atualização completa)
function updateAgente(req, res) {
    const { id } = req.params;
    const agente = req.body;
    const agenteAtualizado = agentesRepository.update(id, agente);

    if (!agenteAtualizado) {
        return res.status(404).json({ message: 'Agente não encontrado' });
    }
    res.status(200).json(agenteAtualizado);
}

// Função para lidar com a requisição PATCH /agentes/:id (atualização parcial)
function patchAgente(req, res) {
    const { id } = req.params;
    const agente = req.body;
    const agenteAtualizado = agentesRepository.update(id, agente);

    if (!agenteAtualizado) {
        return res.status(404).json({ message: 'Agente não encontrado' });
    }
    res.status(200).json(agenteAtualizado);
}

// Função para lidar com a requisição DELETE /agentes/:id
function deleteAgente(req, res) {
    const { id } = req.params;
    const deletado = agentesRepository.remove(id);

    if (!deletado) {
        return res.status(404).json({ message: 'Agente não encontrado' });
    }
    // Retorna 204 No Content, sem corpo na resposta
    res.status(204).send();
}

// Exporta todas as funções
module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    patchAgente,
    deleteAgente
};