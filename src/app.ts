import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

export default app;

// ts-node-dev --respawn --transpile-only /src/app.ts
