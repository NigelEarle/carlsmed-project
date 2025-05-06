import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import memesRoutes from './routes/memes';
import rateLimit from './middleware/rateLimit';
import errorHandler from './middleware/errorHandler';

dotenv.config();
const app: Express = express();
const PORT: number = 3001;
const MEMES_ENDPOINT: string = '/memes';

// middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE']
}));
app.use(rateLimit);
app.use(errorHandler);



// mounted routes
app.use(MEMES_ENDPOINT, memesRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});
