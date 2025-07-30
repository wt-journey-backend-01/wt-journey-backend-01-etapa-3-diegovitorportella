const { v4: uuidv4 } = require('uuid');

// Simula um banco de dados em memória para os casos, com um exemplo
let casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    }
];

// Função para listar todos os casos
function findAll() {
    return casos;
}

// Função para encontrar um caso pelo ID
function findById(id) {
    return casos.find(caso => caso.id === id);
}

// Função para criar um novo caso
function create(caso) {
    const novoCaso = { id: uuidv4(), ...caso };
    casos.push(novoCaso);
    return novoCaso;
}

// Função para atualizar um caso
function update(id, caso) {
    const index = casos.findIndex(c => c.id === id);
    if (index !== -1) {
        casos[index] = { ...casos[index], ...caso };
        return casos[index];
    }
    return null;
}

// Função para remover um caso
function remove(id) {
    const index = casos.findIndex(c => c.id === id);
    if (index !== -1) {
        casos.splice(index, 1);
        return true;
    }
    return false;
}

// Exporta as funções
module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};