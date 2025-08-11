require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');

// Importação do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');

app.use(express.json());

// Rota da documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Usando as rotas com prefixos
app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});