require('dotenv').config({
  path:
    process.env.NODE_ENV === 'dev'
      ? '.env.dev'
      : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env'
});
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as useCase from '../../../application';
import { ShortenerTypeOrmRepository } from '../../db/typeorm/shortener-typeorm.repository';
import { dataSource } from '../../db/typeorm/dataSource';
import { Shortener } from '../../../domain/shortener.entity';

const app: Express = express();
app.use(express.json());
app.use(cors());

// establish database connection
const connect = async () => {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization: ', error);
  }
};
connect();

const port = process.env.PORT || 3000;
const shortenerOrmRepo = dataSource.getRepository(Shortener);
const shortenerRepo = new ShortenerTypeOrmRepository(shortenerOrmRepo);

app.get('/', async (_: Request, res: Response) => {
  res.status(200).json({ message: 'Weelcome to URL Shortener!' });
});

app.get('/shorturls', async (_: Request, res: Response) => {
  const listAllShortURLsUseCase = new useCase.ListAllShortURLsUseCase(
    shortenerRepo
  );
  const result = await listAllShortURLsUseCase.execute();
  if (!result) {
    res.status(404).json({ message: 'Not Found' });
  } else {
    res.status(200).json(result);
  }
});

app.get('/shortener', async (_: Request, res: Response) => {
  const listAllShortenersUseCase = new useCase.ListAllShortenersUseCase(
    shortenerRepo
  );
  const result = await listAllShortenersUseCase.execute();
  if (!result) {
    res.status(404).json({ message: 'Failed to load resource' });
  } else if (!result.length) {
    res.status(204).json({ message: 'Not Found' });
  } else {
    res.status(200).json(result);
  }
});

app.get('/shortener/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: 'Bad Request' });
  }
  const findShortURLByIdUseCase = new useCase.FindShortURLByIdUseCase(
    shortenerRepo
  );
  const result = await findShortURLByIdUseCase.execute(id);
  if (result === null) {
    res.status(204).json({ message: 'Not Found' });
  } else {
    res.status(200).json(result);
  }
});

app.post('/shortener/date', async (req: Request, res: Response) => {
  const findAllShortURLsByDateUseCase =
    new useCase.FindAllShortURLsByDateUseCase(shortenerRepo);
  const result = await findAllShortURLsByDateUseCase.execute(req.body);
  if (!result) {
    res.status(404).json({ message: 'Failed to load resource' });
  } else if (!result.length) {
    res.status(204).json({ message: 'Not Found' });
  } else {
    res.status(201).json(result);
  }
});

app.post('/url', async (req: Request, res: Response) => {
  const findURLUseCase = new useCase.FindURLUseCase(shortenerRepo);
  const result = await findURLUseCase.execute(req.body);
  if (!result) {
    res.status(204).json({ message: 'Not Found' });
  } else {
    res.status(201).json(result);
  }
});

app.get('/:shorturl', async (req: Request, res: Response) => {
  const { shorturl } = req.params;
  if (!shorturl) {
    res.status(400).json({ message: 'Bad Request' });
  }
  const findURLUseCase = new useCase.FindURLUseCase(shortenerRepo);
  const shortURLObj = {
    shortURL: `${req.protocol}://${req.get('Host')}/${shorturl}`
  };

  const result = await findURLUseCase.execute(shortURLObj);
  if (!result) {
    res.status(204).json({ message: 'Not Found' });
  } else {
    res.redirect(301, result.url);
  }
});

app.post('/shortener', async (req: Request, res: Response) => {
  const createShortenerUseCase = new useCase.CreateShortenerUseCase(
    shortenerRepo
  );
  const response = await createShortenerUseCase.execute(req.body);
  res.status(201).json(response);
});

export const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
