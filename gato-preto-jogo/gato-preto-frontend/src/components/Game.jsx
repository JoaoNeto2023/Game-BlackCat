import React, { useState } from 'react';

const API_URL = 'http://localhost:3000/game';

const whiteCatImg = '/images/white-cat.png';
const whiteCatOpenImg = '/images/white-cat-open.png';
const blackCatImg = '/images/black-cat.png';

export default function CatGame() {
  const [playerName, setPlayerName] = useState('');
  const [game, setGame] = useState(null);
  const [message, setMessage] = useState('');

  const startGame = async () => {
    if (!playerName.trim()) {
      setMessage('Por favor, digite seu nome.');
      return;
    }
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName })
    });
    const data = await res.json();
    setGame(data);
    setMessage('Jogo iniciado! Clique nos gatos para revelar.');
  };

  const revealCat = async (index) => {
    if (game.guesses.includes(index + 1)) {
      setMessage('Você já revelou esse gato.');
      return;
    }

    const res = await fetch(`${API_URL}/${game.id}/guess`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guess: index + 1 })
    });

    if (!res.ok) {
      const err = await res.json();
      setMessage(err.error || 'Erro no servidor');
      return;
    }

    const data = await res.json();
    setGame(data.game);
    setMessage(data.message);
  };

  if (!game) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Jogo dos Gatos Pretos</h2>
        <input
          placeholder="Digite seu nome"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
        />
        <button onClick={startGame} style={{ marginLeft: 10 }}>Iniciar Jogo</button>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Jogador: {game.playerName}</h2>
      <p>Status: {game.status}</p>
      <p>{message}</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 100px)',
          gridGap: '10px',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        {[...Array(25)].map((_, idx) => {
          const isRevealed = game.guesses.includes(idx + 1);
          const isBlackCat = game.blackCats.includes(idx + 1);

          const imgSrc = isRevealed
            ? (isBlackCat ? blackCatImg : whiteCatOpenImg)
            : whiteCatImg;

          return (
            <img
              key={idx}
              src={imgSrc}
              alt="gato"
              style={{ width: 90, height: 90, cursor: isRevealed ? 'default' : 'pointer' }}
              onClick={() => !isRevealed && revealCat(idx)}
            />
          );
        })}
      </div>
    </div>
  );
}
