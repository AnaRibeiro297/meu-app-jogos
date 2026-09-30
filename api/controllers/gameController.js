const gameService = require('../services/gameService');

function listarJogos(req, res) {
  try {
    const jogos = gameService.obterTodosJogos();
    res.json(jogos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

function buscarJogoPorId(req, res) {
  try {
    const { id } = req.params;
    const jogo = gameService.obterJogoPorId(id);
    if (!jogo) {
      return res.status(404).json({ erro: 'Jogo não encontrado' });
    }
    res.json(jogo);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

module.exports = {
  listarJogos,
  buscarJogoPorId
};