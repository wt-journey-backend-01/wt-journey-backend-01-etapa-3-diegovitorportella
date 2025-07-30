const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Casos e Agentes',
    version: '1.0.0',
    description: 'API para gerenciar casos e agentes do departamento de policia',
  },
  servers: [
    {
      url: 'https://wt-journey-backend-01-etapa-2.onrender.com', // URL do seu servidor na Render
      description: 'Servidor de Produção'
    },
    {
      url: 'http://localhost:3000', // URL para testes locais
      description: 'Servidor Local'
    }
  ]
};

const options = {
  swaggerDefinition,
  // Caminho para os arquivos que contêm as anotações da API (rotas)
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

// A linha que faltava:
module.exports = swaggerSpec;