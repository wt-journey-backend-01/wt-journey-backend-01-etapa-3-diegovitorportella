// utils/errorHandler.js

function errorHandler(res, error) {
  console.error('[ERROR HANDLER]', error);
  res.status(500).json({
    error: 'Erro interno do servidor'
  });
}

module.exports = errorHandler;
