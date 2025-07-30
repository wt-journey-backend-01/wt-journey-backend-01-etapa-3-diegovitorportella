const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger'); // Vamos criar este arquivo depois
const agentesRouter = require('./routes/agentesRoutes');
const casosRouter = require('./routes/casosRoutes');

const app = express();
const PORT = 3000;

// Middleware para interpretar o corpo da requisição em JSON
app.use(express.json());

// Rota para a documentação da API com Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Adiciona os roteadores para agentes e casos na aplicação
app.use(agentesRouter);
app.use(casosRouter);

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});