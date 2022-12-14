import { faker } from '@faker-js/faker';
import { ShortenerInMemoryRepository } from '../infra/db/in-memory/shortener-in-memory.repository';
import { CreateShortenerUseCase } from './create-shortener.use-case';
import { ListAllShortURLsUseCase } from './list-all-shorturls.use-case';
import { ShortenerInterface, urlProps } from '../domain/shortener.entity';

const repository = new ShortenerInMemoryRepository();
const createShortenerUseCase = new CreateShortenerUseCase(repository);

describe('ListAllShortURLsUseCase Tests', () => {
  it('should list all shortURLs', async () => {
    const urlList: urlProps[] = [];
    const shorteners: ShortenerInterface[] = [];
    for (let i = 0; i < 3; i++) {
      urlList.push({
        url: faker.internet.url()
      });
      const result = await createShortenerUseCase.execute(urlList[i]);
      shorteners.push(result);
    }
    const listAllShortURLsUseCase = new ListAllShortURLsUseCase(repository);
    const shortURLsList = listAllShortURLsUseCase.execute();
    shortURLsList.then((list) =>
      list.forEach((shortURL, index) => {
        expect(shortURL).toStrictEqual(shorteners[index].shortURL);
      })
    );
  });
});
