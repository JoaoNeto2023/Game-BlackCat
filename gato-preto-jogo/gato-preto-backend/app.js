import express from 'express';
import cors from 'cors';  // importe o cors
import catGameRoutes from './routes/catGame.js';
import { sequelize } from './models/catGame.js';

const app = express();
const PORT = 3000;

app.use(cors());  

app.use(express.json());
app.use('/game', catGameRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}

start();
