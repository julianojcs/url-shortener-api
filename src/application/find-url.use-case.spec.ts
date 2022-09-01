import { faker } from '@faker-js/faker';
import { Shortener, urlProps } from '../domain/shortener.entity';
import { dataSource } from '../infra/db/typeorm/dataSource';
import { ShortenerInMemoryRepository } from '../infra/db/in-memory/shortener-in-memory.repository';
import { ShortenerTypeOrmRepository } from '../infra/db/typeorm/shortener-typeorm.repository';
import { CreateShortenerUseCase } from './create-shortener.use-case';
import { FindURLUseCase } from './find-url.use-case';

const url: urlProps = {
  url: faker.internet.url()
};
const shortURL = {
  shortURL: `${process.env.URL}${Math.random().toString(36).substring(5)}`
};

describe('FindURLUseCase Tests', () => {
  it('should find a URL by shortURL, using in-memory repository', async () => {
    const repository = new ShortenerInMemoryRepository();
    const createShortenerUseCase = new CreateShortenerUseCase(repository);
    const shortener = await createShortenerUseCase.execute(url);
    const findURLUseCase = new FindURLUseCase(repository);
    const URLFound = await findURLUseCase.execute({
      shortURL: shortener.shortURL
    });
    expect(URLFound!.url).toBe(shortener.url);
  });
  it("shouldn't find a URL by shortURL, using in-memory repository", async () => {
    const repository = new ShortenerInMemoryRepository();
    const findURLUseCase = new FindURLUseCase(repository);
    const URLFound = await findURLUseCase.execute(shortURL);
    expect(URLFound).toBeNull();
  });
  it('should find a URL by shortURL, using database repository', async () => {
    await dataSource.initialize();
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    const createShortenerUseCase = new CreateShortenerUseCase(repository);
    const shortener = await createShortenerUseCase.execute(url);
    const findURLUseCase = new FindURLUseCase(repository);
    const URLFound = await findURLUseCase.execute({
      shortURL: shortener.shortURL
    });
    expect(URLFound!.url).toBe(shortener.url);
    await dataSource.destroy();
  });
  it("shouldn't find a URL by shortURL, using database repository", async () => {
    await dataSource.initialize();
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    const findURLUseCase = new FindURLUseCase(repository);
    const URLFound = await findURLUseCase.execute(shortURL);
    expect(URLFound).toBeNull();
    await dataSource.destroy();
  });
});
