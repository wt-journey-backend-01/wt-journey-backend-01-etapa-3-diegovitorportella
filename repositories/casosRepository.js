const db = require('../db/db');

const getAllCasos = async () => {
  return await db('casos').select('*');
};

const getCasoById = async (id) => {
  return await db('casos').where({ id }).first();
};

const createCaso = async (caso) => {
  const [newCaso] = await db('casos').insert(caso).returning('*');
  return newCaso;
};

const updateCaso = async (id, caso) => {
  const [updatedCaso] = await db('casos')
    .where({ id })
    .update(caso)
    .returning('*');
  return updatedCaso;
};

const deleteCaso = async (id) => {
  return await db('casos').where({ id }).del();
};

module.exports = {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  deleteCaso,
};