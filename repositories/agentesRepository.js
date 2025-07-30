const { v4: uuidv4 } = require('uuid');

// Simula um banco de dados em memória, começando com um agente de exemplo
let agentes = [
    {
        id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        nome: "Rommel Carneiro",
        dataDeIncorporacao: "1992-10-04",
        cargo: "delegado"
    }
];

// Função para listar todos os agentes
function findAll() {
    return agentes;
}

// Função para encontrar um agente pelo ID
function findById(id) {
    return agentes.find(agente => agente.id === id);
}

// Função para criar um novo agente
function create(agente) {
    // Gera um novo ID único e adiciona o agente ao array
    const novoAgente = { id: uuidv4(), ...agente };
    agentes.push(novoAgente);
    return novoAgente;
}

// Função para atualizar um agente (usada tanto para PUT quanto para PATCH)
function update(id, agente) {
    const index = agentes.findIndex(a => a.id === id);
    if (index !== -1) {
        // Atualiza o objeto no array
        agentes[index] = { ...agentes[index], ...agente };
        return agentes[index];
    }
    return null; // Retorna null se não encontrar
}

// Função para remover um agente
function remove(id) {
    const index = agentes.findIndex(a => a.id === id);
    if (index !== -1) {
        // Remove o agente do array
        agentes.splice(index, 1);
        return true; // Retorna true se foi bem-sucedido
    }
    return false; // Retorna false se não encontrar
}

// Exporta as funções para que possam ser usadas em outros arquivos (nos controllers)
module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};