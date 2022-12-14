import { faker } from '@faker-js/faker';
import { Shortener, urlProps } from '../domain/shortener.entity';
import { dataSource } from '../infra/db/typeorm/dataSource';
import { ShortenerInMemoryRepository } from '../infra/db/in-memory/shortener-in-memory.repository';
import { ShortenerTypeOrmRepository } from '../infra/db/typeorm/shortener-typeorm.repository';
import { CreateShortenerUseCase } from './create-shortener.use-case';

const url: urlProps = {
  url: faker.internet.url()
};

describe('CreateShortenerUseCase Tests', () => {
  it('should create a new shortener and persisting it in memory.', async () => {
    const repository = new ShortenerInMemoryRepository();
    const createShortenerUseCase = new CreateShortenerUseCase(repository);
    const shortener = await createShortenerUseCase.execute(url);
    const urlFound = await repository.findURL({ shortURL: shortener.shortURL });

    expect(repository.items).toHaveLength(1);
    expect(shortener.shortURL).toBe(repository.items[0].shortURL);
    expect(urlFound!.url).toBe(url.url);
  });
  it('should create a new shortener and persisting it in the database.', async () => {
    await dataSource.initialize();
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    const createShortenerUseCase = new CreateShortenerUseCase(repository);
    const shortener = await createShortenerUseCase.execute(url);
    const urlFound = await repository.findURL({ shortURL: shortener.shortURL });
    const shortURLFound = await repository.findShortURLById(shortener.id);

    expect(shortener.url).toBe(url.url);
    expect(urlFound!.url).toBe(url.url);
    expect(shortener.shortURL).toBe(shortURLFound!.shortURL);
    await dataSource.destroy();
  });
});
