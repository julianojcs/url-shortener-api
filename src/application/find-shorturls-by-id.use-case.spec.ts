import crypto from 'crypto';
import { faker } from '@faker-js/faker';
import { Shortener } from '../domain/shortener.entity';
import { dataSourceInMemory as dataSource } from '../infra/db/typeorm/dataSource';
import { ShortenerInMemoryRepository } from '../infra/db/in-memory/shortener-in-memory.repository';
import { ShortenerTypeOrmRepository } from '../infra/db/typeorm/shortener-typeorm.repository';
import { CreateShortenerUseCase } from './create-shortener.use-case';
import { FindShortURLByIdUseCase } from './find-shorturls-by-id.use-case';

const url = faker.internet.url();
const id = crypto.randomUUID();

describe('FindShortURLByIdUseCase Tests', () => {
  it('should find a shortURL by id, using in-memory repository', async () => {
    const repository = new ShortenerInMemoryRepository();
    const createShortenerUseCase = new CreateShortenerUseCase(repository);
    const shortener = await createShortenerUseCase.execute(url);
    const findShortURLByIdUseCase = new FindShortURLByIdUseCase(repository);
    const shortURLFound = await findShortURLByIdUseCase.execute(shortener.id);
    expect(shortURLFound).toBe(shortener.shortURL);
  });
  it("shouldn't find a shortURL by id, using in-memory repository", async () => {
    const repository = new ShortenerInMemoryRepository();
    const createShortenerUseCase = new CreateShortenerUseCase(repository);
    await createShortenerUseCase.execute(url);
    const findShortURLByIdUseCase = new FindShortURLByIdUseCase(repository);
    const shortURLFound = await findShortURLByIdUseCase.execute(id);
    expect(shortURLFound).toBeNull();
  });
  it('should find a shortURL by id, using database repository', async () => {
    await dataSource.initialize();
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    const createShortenerUseCase = new CreateShortenerUseCase(repository);
    const shortener = await createShortenerUseCase.execute(url);
    const findShortURLByIdUseCase = new FindShortURLByIdUseCase(repository);
    const shortURLFound = await findShortURLByIdUseCase.execute(shortener.id);
    expect(shortURLFound).toBe(shortener.shortURL);
    await dataSource.destroy();
  });
  it("shouldn't find a shortURL by id, using database repository", async () => {
    await dataSource.initialize();
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    const createShortenerUseCase = new CreateShortenerUseCase(repository);
    await createShortenerUseCase.execute(url);
    const findShortURLByIdUseCase = new FindShortURLByIdUseCase(repository);
    const shortURLFound = await findShortURLByIdUseCase.execute(id);
    expect(shortURLFound).toBeNull();
    await dataSource.destroy();
  });
});
