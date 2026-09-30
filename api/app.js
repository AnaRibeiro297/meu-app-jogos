const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/jogos', gameRoutes);

module.exports = app;