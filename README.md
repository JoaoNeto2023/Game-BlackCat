# Jogo do Gato Preto

Este é um projeto simples de um jogo de adivinhação desenvolvido em **Node.js/Express** no backend e **React** no frontend. O objetivo é encontrar os gatos pretos escondidos entre vários gatos brancos.

---

## Funcionalidades

- Backend em Node.js com Express e SQLite via Sequelize para persistência dos dados.
- Operações para criar novo jogo, fazer palpites e consultar estado do jogo.
- Frontend React que exibe uma grade de gatos (cartas) que podem ser clicadas para revelar se são pretos ou brancos.
- Jogo com 20 gatos, sendo 5 deles pretos espalhados aleatoriamente.
- Interface interativa sem animações de flip (troca instantânea de imagens ao clicar).
- Validação e feedback para o jogador, incluindo mensagens de status.


## Tecnologias Utilizadas

- Backend:
  - Node.js
  - Express
  - Sequelize ORM
  - SQLite

- Frontend:
  - React
  - Vite (ferramenta de build)
  - CSS Grid para layout

---

## Como Executar

### Backend

1. Navegue até a pasta do backend:


cd backend


2. Instale as dependências:


npm install


3. Inicie o servidor:


npm run dev


O backend estará rodando em `http://localhost:3000`.



### Frontend

1. Navegue até a pasta do frontend:


cd frontend


2. Instale as dependências:


npm install


3. Inicie o servidor de desenvolvimento:


npm run dev


O frontend estará disponível em `http://localhost:5173` (ou outra porta informada pelo terminal).

---

## Como Jogar

1. No frontend, digite seu nome e clique em **Iniciar Jogo**.
2. A tela exibirá uma grade com 20 gatos brancos.
3. Clique nas imagens para revelar se o gato é preto ou branco aberto.
4. O objetivo é encontrar os 5 gatos pretos espalhados.
5. Receba feedback sobre seu progresso e mensagens de status.

---

## Observações

* O backend permite múltiplas partidas independentes pelo mesmo ou diferentes jogadores.
* O estado do jogo é armazenado no banco de dados SQLite local.
* O frontend consome a API REST do backend para gerenciar o jogo.

---

## Contato

Caso tenha dúvidas, sugestões ou queira contribuir, fique à vontade para abrir uma issue ou contato.

---

**Divirta-se encontrando o gato preto! 🐱🖤**



