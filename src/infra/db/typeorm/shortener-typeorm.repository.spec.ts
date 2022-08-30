// import { dataSourceInMemory as dataSource } from './dataSource';
import { dataSourceInMemory as dataSource } from './dataSource';
import { Shortener } from '../../../domain/shortener.entity';
import { ShortenerTypeOrmRepository } from './shortener-typeorm.repository';
import crypto from 'crypto';

const url: string = 'https://www.google.com';

beforeEach(async () => {
  await dataSource.initialize();
});
afterEach(async () => {
  await dataSource.destroy();
});

describe('ShortenerTypeOrmRepository Tests', () => {
  it('should insert a new shortener', async () => {
    // await dataSource.initialize();
    let shortener = Shortener.create(url);
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    await repository.insert(shortener);

    const shortenerFound = await ormRepo.findOneBy({ id: shortener.id });

    expect(shortenerFound?.toJSON()).toStrictEqual(shortener.toJSON());
    expect(shortenerFound).toStrictEqual(shortener);
  });
  it('should find URL by shortURL', async () => {
    let shortener = Shortener.create(url);
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    await repository.insert(shortener);
    const theURL = await repository.findURL(shortener.shortURL);
    expect(theURL).toBe(url);
  });
  it('should not find URL by shortURL', async () => {
    let shortURL = `${process.env.URL}${Math.random()
      .toString(36)
      .substring(5)}`;
    let shortener = Shortener.create(
      `${url}/${Math.random().toString(36).substring(5)}`,
    );
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    await repository.insert(shortener);
    const theURL = await repository.findURL(shortURL);
    expect(theURL).toBeNull();
  });
  it('should find ShortURL by findShortURLById', async () => {
    let shortener = Shortener.create(url);
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    await repository.insert(shortener);
    const shortURL = await repository.findShortURLById(shortener.id);
    expect(shortener.shortURL).toBe(shortURL);
  });
  it('should not find ShortURL by findShortURLById', async () => {
    let shortener = Shortener.create(url);
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    await repository.insert(shortener);
    const shortURL = await repository.findShortURLById(crypto.randomUUID());
    expect(shortURL).toBeNull();
  });
  it('should findAllByDate shorteners', async () => {
    const shorteners: Shortener[] = [];
    const ormRepo = dataSource.getRepository(Shortener);
    const repository = new ShortenerTypeOrmRepository(ormRepo);
    for (let i = 0; i < 3; i++) {
      let shortener = Shortener.create(`https://www.google.com/rota${i + 1}`);
      await repository.insert(shortener);
      shorteners.push(shortener);
    }
    const date = new Date();
    const shortenerList = await repository.findAllByDate(date);
    expect(shortenerList).toHaveLength(3);
    expect(shortenerList).toHaveLength(shorteners.length);
    expect(shortenerList).toHaveLength(shortenerList.length);
    expect(shortenerList[0].createdAt).toStrictEqual(shorteners[0].createdAt);
    expect(shortenerList[1].createdAt).toStrictEqual(shorteners[1].createdAt);
    expect(shortenerList[2].createdAt).toStrictEqual(shorteners[2].createdAt);
  });
  it('should find all shorteners', async () => {
    const ormRepo = dataSource.getRepository(Shortener);
    const shorteners: Shortener[] = [];
    const repository = new ShortenerTypeOrmRepository(ormRepo);

    for (let i = 0; i < 3; i++) {
      const shortener = Shortener.create(`https://www.google.com/rota${i + 1}`);
      await repository.insert(shortener);
      shorteners.push(shortener);
    }
    const shortenerList = await repository.findAll();

    expect(shortenerList).toHaveLength(3);
    expect(shortenerList).toHaveLength(shorteners.length);
    expect(shortenerList).toHaveLength(shortenerList.length);
    expect(shortenerList[0]).toStrictEqual(shorteners[0]);
    expect(shortenerList[1]).toStrictEqual(shortenerList[1]);
    expect(shortenerList[2].url).toBe('https://www.google.com/rota3');
  });
});
