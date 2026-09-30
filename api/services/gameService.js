const gameData = require('../data/gameData');

function listar() {
  return gameData.getAll();
}

function criar(jogoId, observacao) {
  const jaExiste = gameData.findByJogoId(jogoId);
  if (jaExiste) {
    return { status: 409, erro: 'Este jogo ja esta cadastrado' };
  }

  const novoJogo = gameData.create(jogoId, observacao);
  return { status: 201, dados: novoJogo };
}

function atualizar(id, observacao) {
  const jogoAtualizado = gameData.update(id, observacao);
  if (!jogoAtualizado) {
    return { status: 404, erro: 'Jogo nao encontrado' };
  }

  return { status: 200, dados: jogoAtualizado };
}

function remover(id) {
  const removido = gameData.remove(id);
  if (!removido) {
    return { status: 404, erro: 'Jogo nao encontrado' };
  }

  return { status: 204 };
}

module.exports = { listar, criar, atualizar, remover };