const express = require('express');
const app = express();
const PORT = 3000;

// Importação das rotas da sua aplicação
const agentesRouter = require('./routes/agentesRouter');
const casosRouter = require('./routes/casosRouter');

// Importação dos módulos do Swagger para a documentação
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger'); // Garante que o caminho para seu arquivo de configuração do swagger está correto

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Rota para servir a documentação da API
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middlewares para as rotas de agentes e casos
app.use(agentesRouter);
app.use(casosRouter);

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});