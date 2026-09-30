const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/', gameController.listarJogos);
router.get('/:id', gameController.buscarJogoPorId);

module.exports = router;