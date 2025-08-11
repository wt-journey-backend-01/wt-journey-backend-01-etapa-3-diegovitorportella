// repositories/agentesRepository.js - VERSÃO COM BÔNUS
const db = require('../db/db');

const getAllAgentes = async (filters = {}) => {
    const query = db('agentes').select('*');

    // Bônus: Filtrar por cargo
    if (filters.cargo) {
        query.where('cargo', 'ilike', filters.cargo);
    }

    // Bônus: Ordenar por data de incorporação
    if (filters.sort) {
        const order = filters.sort.startsWith('-') ? 'desc' : 'asc';
        const column = order === 'desc' ? filters.sort.substring(1) : filters.sort;
        if (column === 'dataDeIncorporacao') {
            query.orderBy(column, order);
        }
    }

    return await query;
};

// ... (o resto do arquivo permanece igual)
const getAgenteById = async (id) => {
  return await db('agentes').where({ id }).first();
};

const createAgente = async (agente) => {
  const [newAgente] = await db('agentes').insert(agente).returning('*');
  return newAgente;
};

const updateAgente = async (id, agente) => {
  const [updatedAgente] = await db('agentes')
    .where({ id })
    .update(agente)
    .returning('*');
  return updatedAgente;
};

const deleteAgente = async (id) => {
  return await db('agentes').where({ id }).del();
};

const getCasosByAgenteId = async (id) => {
  return await db('casos').where({ agente_id: id });
};

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  deleteAgente,
  getCasosByAgenteId,
};