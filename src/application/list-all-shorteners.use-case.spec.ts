import { ShortenerInMemoryRepository } from "../infra/db/in-memory/shortener-in-memory.repository";
import { CreateShortenerUseCase } from './create-shortener.use-case';
import { ListAllShortenersUseCase } from './list-all-shorteners.use-case';
import { ShortenerInterface } from '../domain/shortener.entity';

const repository = new ShortenerInMemoryRepository();
const createShortenerUseCase = new CreateShortenerUseCase(repository);

describe('ListAllShortenersUseCase Tests', () => {
  it('should list all shorteners', async () => {
    const shorteners: ShortenerInterface[] = [];
    for (let i = 0; i < 3; i++) {
      const result = await createShortenerUseCase.execute(
        `https://www.google.com/rota${i + 1}`,
      );
      shorteners.push(result);
    }
    const listAllShortenersUseCase = new ListAllShortenersUseCase(repository);
    const shortenersList = listAllShortenersUseCase.execute();
    shortenersList.then((list) => expect(list).toHaveLength(3));
    shortenersList.then((list) => expect(list).toHaveLength(shorteners.length));
    shortenersList.then((list) =>
      list.forEach((shortener, index) => {
        expect(shortener.url).toBe(`https://www.google.com/rota${index + 1}`);
      }),
    );
    shortenersList.then((list) =>
      list.forEach((shortener, index) => {
        expect(shortener).toStrictEqual(shorteners[index]);
      }),
    );
  });
});