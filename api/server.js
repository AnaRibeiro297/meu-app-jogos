const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🎮 API de Jogos disponível em: http://localhost:${PORT}/jogos`);
  console.log(`🖼️  Pasta de imagens em: http://localhost:${PORT}/imagem`);
});