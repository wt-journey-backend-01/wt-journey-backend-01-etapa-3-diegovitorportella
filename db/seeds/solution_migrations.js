/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('casos').del();
  await knex('agentes').del();

  // Inserts seed entries
  await knex('agentes').insert([
    {
      nome: 'James Bond',
      dataDeIncorporacao: '1962-10-05',
      cargo: 'Agente Secreto',
    },
    {
      nome: 'Jason Bourne',
      dataDeIncorporacao: '2002-06-14',
      cargo: 'Agente de Campo',
    },
  ]);

  await knex('casos').insert([
    {
      titulo: 'O Satélite Dourado',
      descricao: 'Recuperar o controle do satélite GoldenEye.',
      status: 'solucionado',
      agente_id: 1,
    },
    {
      titulo: 'A Identidade',
      descricao: 'Descobrir a verdadeira identidade de um agente desmemoriado.',
      status: 'aberto',
      agente_id: 2,
    },
  ]);
};