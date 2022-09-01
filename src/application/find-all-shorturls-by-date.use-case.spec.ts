import { faker } from '@faker-js/faker';
import { Shortener, urlProps, dateProps } from '../domain/shortener.entity';
import { dataSource } from '../infra/db/typeorm/dataSource';
import { ShortenerInMemoryRepository } from '../infra/db/in-memory/shortener-in-memory.repository';
import { ShortenerTypeOrmRepository } from '../infra/db/typeorm/shortener-typeorm.repository';
import { FindAllShortURLsByDateUseCase } from './find-all-shorturls-by-date.use-case';

const dateParam: dateProps = {
  date: new Date(new Date().toLocaleDateString('en-US'))
};
const urlList: urlProps[] = [];
const shorteners: Shortener[] = [];
const ormRepo = dataSource.getRepository(Shortener);
const ormRepository = new ShortenerTypeOrmRepository(ormRepo);
const inMemoryRepository = new ShortenerInMemoryRepository();

beforeAll(async () => {
  await dataSource.initialize();
  for (let i = 0; i < 3; i++) {
    urlList.push({
      url: faker.internet.url()
    });
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
    const findShortURLByDateUseCase = new FindAllShortURLsByDateUseCase(
      inMemoryRepository
    );
    console.log(dateParam);
    const shortenerList = await findShortURLByDateUseCase.execute(dateParam);
    shortenerList.forEach((shortener) => {
      expect(shortener).toBeInstanceOf(Shortener);
      expect(shortener.createdAt).toEqual(dateParam.date);
    });
  });
  it('should find all shortURLs by date, using database repository', async () => {
    const findShortURLByDateUseCase = new FindAllShortURLsByDateUseCase(
      ormRepository
    );
    const shortenerList = await findShortURLByDateUseCase.execute(dateParam);
    shortenerList.forEach((shortener) => {
      expect(shortener).toBeInstanceOf(Shortener);
      expect(shortener.createdAt).toEqual(dateParam.date);
    });
  });
});
