import { ShortenerInMemoryRepository } from '../infra/db/in-memory/shortener-in-memory.repository';
import { CreateShortenerUseCase } from './create-shortener.use-case';
import { ListAllShortURLsUseCase } from './list-all-shorturls.use-case';
import { ShortenerInterface } from '../domain/shortener.entity';

const repository = new ShortenerInMemoryRepository();
const createShortenerUseCase = new CreateShortenerUseCase(repository);

describe('ListAllShortURLsUseCase Tests', () => {
  it('should list all shortURLs', async () => {
    const shorteners: ShortenerInterface[] = [];
    for (let i = 0; i < 3; i++) {
      const result = await createShortenerUseCase.execute(
        `https://www.google.com/rota${i + 1}`,
      );
      shorteners.push(result);
    }
    const listAllShortURLsUseCase = new ListAllShortURLsUseCase(repository);
    const shortURLsList = listAllShortURLsUseCase.execute();
    shortURLsList.then((list) => expect(list).toHaveLength(3));
    shortURLsList.then((list) => expect(list).toHaveLength(shorteners.length));
    shortURLsList.then((list) =>
      list.forEach((shortURL, index) => {
        expect(shortURL).toStrictEqual(shorteners[index].shortURL);
      }),
    );
  });
});
