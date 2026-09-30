function validarCriacao(req, res, next) {
  const { jogoId } = req.body;

  if (!jogoId) {
    return res.status(400).json({ erro: 'O campo jogoId e obrigatorio.' });
  }

  if (isNaN(parseInt(jogoId, 10))) {
    return res.status(400).json({ erro: 'O campo jogoId deve ser um numero valido.' });
  }

  next();
}

function validarAtualizacao(req, res, next) {
  const { observacao } = req.body;

  if (observacao === undefined) {
    return res.status(400).json({ erro: 'O campo observacao e obrigatorio para atualizacao.' });
  }

  next();
}

function validarIdParam(req, res, next) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'O ID fornecido na URL deve ser um numero valido.' });
  }

  next();
}

module.exports = {
  validarCriacao,
  validarAtualizacao,
  validarIdParam,
};