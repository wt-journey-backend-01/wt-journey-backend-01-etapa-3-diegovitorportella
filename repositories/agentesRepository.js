const db = require('../db/db');

const getAllAgentes = async () => {
  return await db('agentes').select('*');
};

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