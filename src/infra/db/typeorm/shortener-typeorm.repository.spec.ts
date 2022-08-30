import { faker } from '@faker-js/faker';
// import { dataSourceInMemory as dataSource } from './dataSource';
import { dataSourceInMemory as dataSource } from './dataSource';
import { Shortener } from '../../../domain/shortener.entity';
import { ShortenerTypeOrmRepository } from './shortener-typeorm.repository';
import crypto from 'crypto';

const urlList: string[] = [];
const shorteners: Shortener[] = [];
const ormRepo = dataSource.getRepository(Shortener);
const repository = new ShortenerTypeOrmRepository(ormRepo);

beforeAll(async () => {
  await dataSource.initialize();
  for (let i = 0; i < 3; i++) {
    urlList.push(faker.internet.url());
    const shortener = Shortener.create(urlList[i]);
    await repository.insert(shortener);
    shorteners.push(shortener);
  }
});
afterAll(async () => {
  await dataSource.destroy();
});

describe('ShortenerTypeOrmRepository Tests', () => {
  it('should insert a new shortener', async () => {
    const shortenerFound = await ormRepo.findOneBy({ id: shorteners[0].id });

    expect(shortenerFound?.toJSON()).toStrictEqual(shorteners[0].toJSON());
    expect(shortenerFound).toStrictEqual(shorteners[0]);
  });
  it('should find URL by shortURL', async () => {
    const theURL = await repository.findURL(shorteners[1].shortURL);
    expect(theURL).toBe(urlList[1]);
  });
  it('should not find URL by shortURL', async () => {
    let shortURL = `${process.env.URL}${Math.random()
      .toString(36)
      .substring(5)}`;
    const theURL = await repository.findURL(shortURL);
    expect(theURL).toBeNull();
  });
  it('should find ShortURL by findShortURLById', async () => {
    const shortURL = await repository.findShortURLById(shorteners[0].id);
    expect(shorteners[0].shortURL).toBe(shortURL);
  });
  it('should not find ShortURL by findShortURLById', async () => {
    const shortURL = await repository.findShortURLById(crypto.randomUUID());
    expect(shortURL).toBeNull();
  });
  it('should findAllByDate shorteners', async () => {
    const date = new Date();
    const shortenerList = await repository.findAllByDate(date);
    expect(shortenerList).toHaveLength(3);
    expect(shortenerList).toHaveLength(shorteners.length);
    expect(shortenerList).toHaveLength(shortenerList.length);
    expect(shortenerList[0].createdAt).toStrictEqual(shorteners[0].createdAt);
    expect(shortenerList[1].createdAt).toStrictEqual(shorteners[1].createdAt);
    expect(shortenerList[2].createdAt).toStrictEqual(shorteners[2].createdAt);
    expect(shortenerList[2].url).toStrictEqual(urlList[2]);
  });
  it('should find all shorteners', async () => {
    const shortenerList = await repository.findAll();

    expect(shortenerList).toHaveLength(3);
    expect(shortenerList).toHaveLength(shorteners.length);
    expect(shortenerList).toHaveLength(shortenerList.length);
    expect(shortenerList[0]).toStrictEqual(shorteners[0]);
    expect(shortenerList[1]).toStrictEqual(shortenerList[1]);
    expect(shortenerList[2].url).toBe(urlList[2]);
  });
});
