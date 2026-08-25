import cors from 'cors';
import express from 'express';
import { apiUrl, port } from './config/app';
import './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models/resources';
import { createResourceRouter } from './routes/resourceRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/', (_request, response) => {
  response.json({ name: 'Octofit Tracker API', apiUrl });
});

app.use('/api/users', createResourceRouter(User));
app.use('/api/teams', createResourceRouter(Team));
app.use('/api/activities', createResourceRouter(Activity));
app.use('/api/leaderboard', createResourceRouter(Leaderboard));
app.use('/api/workouts', createResourceRouter(Workout));

app.listen(port, () => {
  console.log(`Octofit Tracker API listening at ${apiUrl}`);
});

export default app;