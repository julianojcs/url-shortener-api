import { faker } from '@faker-js/faker';
import { Shortener, urlProps } from '../domain/shortener.entity';
import { dataSource } from '../infra/db/typeorm/dataSource';
import { ShortenerInMemoryRepository } from '../infra/db/in-memory/shortener-in-memory.repository';
import { ShortenerTypeOrmRepository } from '../infra/db/typeorm/shortener-typeorm.repository';
import { CreateShortURLUseCase } from './create-shorturl.use-case';

const url: urlProps = {
  url: faker.internet.url()
};

describe('CreateShortURLUseCase Tests', () => {
  it('should create a new shortURL and persisting it in memory.', async () => {
    const repository = new ShortenerInMemoryRepository();
    const createShortURLUseCase = new CreateShortURLUseCase(repository);
    const shortURL = await createShortURLUseCase.execute(url);
    expect(shortURL).toBeDefined();
  });

  it('should create a new shortURL and persisting it in the database.', async () => {
    await dataSource.initialize();
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    const createShortURLUseCase = new CreateShortURLUseCase(repository);
    const shortURL = await createShortURLUseCase.execute(url);
    expect(shortURL).toBeDefined();
    await dataSource.destroy();
  });
});
