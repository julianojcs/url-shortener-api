import { ShortenerInMemoryRepository } from "../infra/db/in-memory/shortener-in-memory.repository";
import { CreateShortURLUseCase } from "./create-shorturl.use-case";
import { ListAllShortenersUseCase } from "./list-all-shorteners.use-case";
import { Shortener, ShortenerInterface } from "../domain/shortener.entity";

const url: string = "https://www.google.com";
const repository = new ShortenerInMemoryRepository();
const createShortURLUseCase = new CreateShortURLUseCase(repository);

describe('ListAllShortenersUseCase Tests', () => {
  it('should list all shorteners', async () => {
    const shorteners: ShortenerInterface[] = [];
    for (let i=0; i<3; i++) {
      const result = await createShortURLUseCase.execute(`https://www.google.com/rota${i+1}`);
      shorteners.push(result);
    }
    const listAllShortenersUseCase = new ListAllShortenersUseCase(repository)
    const shortenersList = listAllShortenersUseCase.execute()
    shortenersList.then(list => expect(list).toHaveLength(3));
    shortenersList.then(list => expect(list).toHaveLength(shorteners.length));
    shortenersList.then(list => list.forEach((shortener, index) => {
      expect(shortener.url).toBe(`https://www.google.com/rota${index+1}`);
    }));
    shortenersList.then(list => list.forEach((shortener, index) => {
      expect(shortener).toStrictEqual(shorteners[index]);
    }));
  });
})