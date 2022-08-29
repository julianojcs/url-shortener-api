import { ShortenerInMemoryRepository } from "./shortener-in-memory.repository";
import { Shortener } from "../../../domain/shortener.entity";
import { format } from 'date-fns';
import crypto from 'crypto';

let url: string = 'https://www.google.com';

describe('ShortenerInMemory Repository Tests', () => {
  it('should insert a new shortener', async () => {
    let shortener = Shortener.create(url);
    const repository = new ShortenerInMemoryRepository();
    await repository.insert(shortener);
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0]).toStrictEqual(shortener);
  });
  it('should find URL by shortURL', async () => {
    let shortener = Shortener.create(url);
    const repository = new ShortenerInMemoryRepository();
    await repository.insert(shortener);
    expect(repository.items).toHaveLength(1);
    const theURL = await repository.findURL(shortener.shortURL);
    expect(repository.items[0].url).toBe(theURL);
  });
  it('should not find URL by shortURL', async () => {
    let shortURL = `${process.env.URL}${Math.random()
      .toString(36)
      .substring(5)}`;
    let shortener = Shortener.create(
      `${url}/${Math.random().toString(36).substring(5)}`,
    );
    const repository = new ShortenerInMemoryRepository();
    await repository.insert(shortener);
    expect(repository.items).toHaveLength(1);
    const theURL = await repository.findURL(shortURL);
    expect(theURL).toBeNull();
  });
  it('should find ShortURL by findShortURLById', async () => {
    let shortener = Shortener.create(url);
    const repository = new ShortenerInMemoryRepository();
    await repository.insert(shortener);
    expect(repository.items).toHaveLength(1);
    const shortURL = await repository.findShortURLById(shortener.id);
    expect(repository.items[0].shortURL).toBe(shortURL);
  });
  it('should not find ShortURL by findShortURLById', async () => {
    let shortener = Shortener.create(url);
    const repository = new ShortenerInMemoryRepository();
    await repository.insert(shortener);
    expect(repository.items).toHaveLength(1);
    const shortURL = await repository.findShortURLById(crypto.randomUUID());
    expect(shortURL).toBeNull();
  });
  it('should findAllByDate shorteners', async () => {
    const shorteners: Shortener[] = [];
    const repository = new ShortenerInMemoryRepository();
    for (let i = 0; i < 3; i++) {
      let shortener = Shortener.create(`https://www.google.com/rota${i + 1}`);
      await repository.insert(shortener);
      shorteners.push(shortener);
    }
    // const date = format(new Date(), 'dd/MM/yyyy')
    const shortenerList = await repository.findAllByDate(new Date());

    expect(repository.items).toHaveLength(3);
    expect(repository.items).toHaveLength(shorteners.length);
    expect(repository.items).toHaveLength(shortenerList.length);
    expect(format(repository.items[0].createdAt, 'dd/MM/yyyy')).toBe(
      format(shorteners[0].createdAt, 'dd/MM/yyyy'),
    );
    expect(format(repository.items[1].createdAt, 'dd/MM/yyyy')).toBe(
      format(shorteners[1].createdAt, 'dd/MM/yyyy'),
    );
    expect(format(repository.items[2].createdAt, 'dd/MM/yyyy')).toBe(
      format(shorteners[2].createdAt, 'dd/MM/yyyy'),
    );
  });
  it('should findAll shorteners', async () => {
    const shorteners: Shortener[] = [];
    const repository = new ShortenerInMemoryRepository();
    for (let i = 0; i < 3; i++) {
      let shortener = Shortener.create(`https://www.google.com/rota${i + 1}`);
      await repository.insert(shortener);
      shorteners.push(shortener);
    }
    const shortenerList = await repository.findAll();

    expect(repository.items).toHaveLength(3);
    expect(repository.items).toHaveLength(shorteners.length);
    expect(repository.items).toHaveLength(shortenerList.length);
    expect(repository.items[0]).toStrictEqual(shorteners[0]);
    expect(repository.items[1]).toStrictEqual(shortenerList[1]);
    expect(repository.items[2].url).toBe('https://www.google.com/rota3');
  });
});