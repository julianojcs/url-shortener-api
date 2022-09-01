import { faker } from '@faker-js/faker';
import { ShortenerInMemoryRepository } from '../infra/db/in-memory/shortener-in-memory.repository';
import { CreateShortenerUseCase } from './create-shortener.use-case';
import { ListAllShortenersUseCase } from './list-all-shorteners.use-case';
import { ShortenerInterface, urlProps } from '../domain/shortener.entity';

const repository = new ShortenerInMemoryRepository();
const createShortenerUseCase = new CreateShortenerUseCase(repository);

describe('ListAllShortenersUseCase Tests', () => {
  it('should list all shorteners', async () => {
    const urlList: urlProps[] = [];
    const shorteners: ShortenerInterface[] = [];
    for (let i = 0; i < 3; i++) {
      urlList.push({
        url: faker.internet.url()
      });
      const result = await createShortenerUseCase.execute(urlList[i]);
      shorteners.push(result);
    }
    const listAllShortenersUseCase = new ListAllShortenersUseCase(repository);
    const shortenersList = listAllShortenersUseCase.execute();
    shortenersList.then((list) =>
      list.forEach((shortener, index) => {
        expect(shortener.url).toStrictEqual(urlList[index].url);
        expect(shortener.url).toStrictEqual(shorteners[index].url);
      })
    );
  });
});
