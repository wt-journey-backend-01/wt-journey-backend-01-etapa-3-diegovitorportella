// repositories/casosRepository.js - VERSÃO OTIMIZADA
const db = require('../db/db');

const getAllCasos = async (filters = {}) => {
  const query = db('casos').select('*');

  if (filters.agente_id) {
    query.where('agente_id', filters.agente_id);
  }
  if (filters.status) {
    query.where('status', 'ilike', filters.status);
  }
  if (filters.q) {
    query.where(function() {
      this.where('titulo', 'ilike', `%${filters.q}%`)
          .orWhere('descricao', 'ilike', `%${filters.q}%`);
    });
  }
  return await query;
};

// ... (o resto das funções permanecem as mesmas)
const getCasoById = async (id) => { return await db('casos').where({ id }).first(); };
const createCaso = async (caso) => { const [newCaso] = await db('casos').insert(caso).returning('*'); return newCaso; };
const updateCaso = async (id, caso) => { const [updatedCaso] = await db('casos').where({ id }).update(caso).returning('*'); return updatedCaso; };
const deleteCaso = async (id) => { return await db('casos').where({ id }).del(); };

module.exports = { getAllCasos, getCasoById, createCaso, updateCaso, deleteCaso };