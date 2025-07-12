import express from 'express';
import { CatGame } from '../models/catGame.js';

const router = express.Router();

function generateBlackCats(total = 5, limit = 25) {
  const positions = new Set();
  while (positions.size < total) {
    positions.add(Math.floor(Math.random() * limit) + 1);
  }
  return [...positions];
}

router.post('/', async (req, res, next) => {
  try {
    const blackCats = generateBlackCats();
    const game = await CatGame.create({
      playerName: req.body.playerName,
      blackCats,
      guesses: [],
      status: 'em andamento'
    });
    res.status(201).json(game);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/guess', async (req, res, next) => {
  try {
    const guess = parseInt(req.body.guess);
    const game = await CatGame.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Partida não encontrada' });

    if (game.status === 'você venceu') {
      return res.status(400).json({ error: 'Partida já encerrada' });
    }

    if (game.guesses.includes(guess)) {
      return res.status(400).json({ error: 'Gato já revelado' });
    }

    const updatedGuesses = [...game.guesses, guess];
    const allFound = game.blackCats.every(cat => updatedGuesses.includes(cat));
    const status = allFound ? 'você venceu' : 'em andamento';

    await game.update({ guesses: updatedGuesses, status });

    res.json({
      message: game.blackCats.includes(guess) ? '🎉 Você encontrou um gato preto!' : '❌ Não era um gato preto.',
      game
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const game = await CatGame.findByPk(req.params.id);
    if (!game) return res.status(404).json({ error: 'Partida não encontrada' });
    res.json(game);
  } catch (err) {
    next(err);
  }
});

export default router;
