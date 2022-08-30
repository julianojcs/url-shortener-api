import { faker } from '@faker-js/faker';
import { Shortener, ShortenerInterface } from '../domain/shortener.entity';
import { dataSourceInMemory as dataSource } from '../infra/db/typeorm/dataSource';
import { ShortenerInMemoryRepository } from '../infra/db/in-memory/shortener-in-memory.repository';
import { ShortenerTypeOrmRepository } from '../infra/db/typeorm/shortener-typeorm.repository';
import { CreateShortenerUseCase } from './create-shortener.use-case';
import { FindAllShortURLsByDateUseCase } from './find-all-shorturls-by-date.use-case';

const date = new Date();
const urlList: string[] = [];
const shorteners: Shortener[] = [];
const ormRepo = dataSource.getRepository(Shortener);
const ormRepository = new ShortenerTypeOrmRepository(ormRepo);
const inMemoryRepository = new ShortenerInMemoryRepository();

beforeAll(async () => {
  await dataSource.initialize();
  for (let i = 0; i < 3; i++) {
    urlList.push(faker.internet.url());
    const shortener = Shortener.create(urlList[i]);
    await ormRepository.insert(shortener);
    await inMemoryRepository.insert(shortener);
    shorteners.push(shortener);
  }
});
afterAll(async () => {
  await dataSource.destroy();
});

describe('FindShortURLByDateUseCase Tests', () => {
  it('should find all shortURLs by date, using in-memory repository', async () => {
    const findShortURLByDateUseCase = new FindAllShortURLsByDateUseCase(inMemoryRepository);
    const shortURLList = await findShortURLByDateUseCase.execute(date);
    expect(shortURLList).toHaveLength(shorteners.length);
    shortURLList.forEach((shortURL, index) => {
      expect(typeof shortURL).toBe('string');
      expect(shortURL).toStrictEqual(shorteners[index].shortURL);
    });
  });
  it('should find a shortURL by id, using database repository', async () => {
    const findShortURLByDateUseCase = new FindAllShortURLsByDateUseCase(ormRepository);
    const shortURLList = await findShortURLByDateUseCase.execute(date);
    expect(shortURLList).toHaveLength(shorteners.length);
    shortURLList.forEach((shortURL, index) => {
      expect(typeof shortURL).toBe('string');
      expect(shortURL).toStrictEqual(shorteners[index].shortURL);
    });
  });
});
