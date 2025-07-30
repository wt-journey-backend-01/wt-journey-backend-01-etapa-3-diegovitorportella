const express = require('express');
const app = express();
const PORT = 3000;

// Correção aqui: Os nomes dos arquivos agora estão no plural (agentesRoutes, casosRoutes)
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');

// Importação do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');

app.use(express.json());

// Rota da documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Correção aqui: Usando as variáveis com os nomes corretos
app.use(agentesRoutes);
app.use(casosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});