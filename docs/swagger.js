const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API do Departamento de Polícia',
    version: '1.0.0',
    description: 'Documentação da API para gerenciamento de casos e agentes.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desenvolvimento',
    },
  ],
  // Centraliza as definições de tags e schemas aqui
  tags: [
    {
      name: 'Agentes',
      description: 'API para o gerenciamento de agentes da polícia.',
    },
    {
      name: 'Casos',
      description: 'API para o gerenciamento de casos policiais.',
    },
  ],
  components: {
    schemas: {
      Agente: {
        type: 'object',
        required: ['nome', 'dataDeIncorporacao', 'cargo'],
        properties: {
          id: { type: 'string', description: 'O ID gerado automaticamente para o agente.' },
          nome: { type: 'string', description: 'O nome completo do agente.' },
          dataDeIncorporacao: { type: 'string', format: 'date', description: 'A data de incorporação (YYYY-MM-DD).' },
          cargo: { type: 'string', description: 'O cargo do agente (ex: inspetor, delegado).' }
        },
        example: {
          id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
          nome: "Rommel Carneiro",
          dataDeIncorporacao: "1992-10-04",
          cargo: "delegado"
        }
      },
      Caso: {
        type: 'object',
        required: ['titulo', 'descricao', 'status', 'agente_id'],
        properties: {
          id: { type: 'string', description: 'O ID gerado automaticamente para o caso.' },
          titulo: { type: 'string', description: 'O título do caso.' },
          descricao: { type: 'string', description: 'A descrição detalhada do caso.' },
          status: { type: 'string', description: "O status do caso: 'aberto' ou 'solucionado'." },
          agente_id: { type: 'string', description: 'O ID do agente responsável.' }
        },
        example: {
          id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
          titulo: "homicidio",
          descricao: "Disparos foram reportados...",
          status: "aberto",
          agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  // Caminho para os ficheiros que contêm as anotações da API
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;