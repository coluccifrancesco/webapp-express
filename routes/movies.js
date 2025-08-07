const express = require('express');
const movieRouter = express.Router();
const movieController = require('../controller/movieController');

// router = /api/movies

// Mostra tutti i film
movieRouter.get('/', movieController.index);

// Mostra singolo film
movieRouter.get('/:id', movieController.show);

// Posta la recensione nuova
movieRouter.post('/:id', movieController.post); 

module.exports = movieRouter;