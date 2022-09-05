import { faker } from '@faker-js/faker';
import { dataSource } from './dataSource';
import { Shortener, urlProps } from '../../../domain/shortener.entity';
import { ShortenerTypeOrmRepository } from './shortener-typeorm.repository';
import crypto from 'crypto';

const urlList: urlProps[] = [];
const shorteners: Shortener[] = [];
const ormRepo = dataSource.getRepository(Shortener);
const repository = new ShortenerTypeOrmRepository(ormRepo);

beforeAll(async () => {
  await dataSource.initialize();
  for (let i = 0; i < 3; i++) {
    urlList.push({
      url: faker.internet.url()
    });
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
    const shortURL = {
      shortURL: shorteners[1].shortURL
    };
    const theURL = await repository.findURL(shortURL);
    expect(theURL!.url).toBe(urlList[1].url);
  });
  it('should not find URL by shortURL', async () => {
    const newShortURL = `${process.env.BASEURL}${Math.random()
      .toString(36)
      .substring(5)}`;
    const shortURL = { shortURL: newShortURL };
    const theURL = await repository.findURL(shortURL);
    expect(theURL).toBeNull();
  });
  it('should find ShortURL by findShortURLById', async () => {
    const shortener = await repository.findShortURLById(shorteners[0].id);
    expect(shorteners[0].shortURL).toBe(shortener!.shortURL);
  });
  it('should not find ShortURL by findShortURLById', async () => {
    const shortURL = await repository.findShortURLById(crypto.randomUUID());
    expect(shortURL).toBeNull();
  });
  it('should findAllByDate shorteners', async () => {
    const dateParam = {
      date: new Date(new Date().toLocaleDateString('en-US'))
    };
    const shortenerList = await repository.findAllByDate(dateParam);
    shortenerList.forEach((shortener) => {
      expect(shortener.createdAt).toStrictEqual(dateParam.date);
    });
  });
  it('should find all shorteners', async () => {
    const shortenerList = await repository.findAll();
    shortenerList.forEach((shortener) => {
      expect(shortener).toBeInstanceOf(Shortener);
    });
  });
});
