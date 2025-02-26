import express from 'express';

const app = express();

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import announcementRouter from './routes/announcement.routes.js';
import projectRouter from './routes/project.routes.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/announcements', announcementRouter);
app.use('/api/v1/projects', projectRouter);


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app; 