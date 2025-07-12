import React, { useState } from 'react';

const API_URL = 'http://localhost:3000/game';

const whiteCatClosedImg = '/images/white-cat.png';
const whiteCatOpenImg = '/images/white-cat-open.png';
const blackCatImg = '/images/black-cat.png';

export default function CatGame() {
  const [playerName, setPlayerName] = useState('');
  const [game, setGame] = useState(null);
  const [message, setMessage] = useState('');
  const [revealed, setRevealed] = useState([]); // índices das cartas reveladas

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
    setRevealed([]);
  };

  const revealCat = async (index) => {
    if (revealed.includes(index)) {
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
    setRevealed([...revealed, index]);
    setMessage(data.message);
  };

  if (!game) {
    return (
      <div style={{textAlign:'center', padding:'20px'}}>
        <h2>Jogo do Gato Preto</h2>
        <input
          placeholder="Digite seu nome"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          style={{padding: '10px', fontSize: '1rem'}}
        />
        <button onClick={startGame} style={{marginLeft: '10px', padding:'10px 20px', fontSize:'1rem'}}>
          Iniciar Jogo
        </button>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div style={{textAlign:'center'}}>
      <h2>Jogador: {game.playerName}</h2>
      <p>Status: {game.status}</p>
      <p>{message}</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 100px)',
        gridGap: '15px',
        justifyContent: 'center',
        marginTop: '20px'
      }}>
        {[...Array(20)].map((_, idx) => {
          const isRevealed = revealed.includes(idx);
          const isBlackCat = game.blackCats.includes(idx + 1);

          // Decide qual imagem mostrar
          let imgSrc = whiteCatClosedImg;
          if (isRevealed) {
            imgSrc = isBlackCat ? blackCatImg : whiteCatOpenImg;
          }

          return (
            <div
              key={idx}
              onClick={() => revealCat(idx)}
              style={{
                width: '100px',
                height: '100px',
                cursor: 'pointer',
                border: '2px solid #333',
                borderRadius: '10px',
                boxShadow: '1px 1px 4px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={imgSrc}
                alt="gato"
                style={{ width: '100%', height: '100%', borderRadius: '10px', userSelect: 'none' }}
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
