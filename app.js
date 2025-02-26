import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import announcementRouter from './routes/announcement.routes.js';
import projectRouter from './routes/project.routes.js';
import connectToDataBase from './database/mongodb.js';
import initializeAdmin from './utils/initializeAdmin.js';

const app = express();

// Definição das rotas
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/announcements', announcementRouter);
app.use('/api/v1/projects', projectRouter);

app.get('/', (req, res) => {
  res.send('API Programa Trampolim is running');
});

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);

  try {
    await connectToDataBase(); // Conecta ao banco de dados
    await initializeAdmin();   // Garante que o admin exista no banco
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
  }
});

export default app;
