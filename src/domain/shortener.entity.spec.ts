import { faker } from '@faker-js/faker';
import { Shortener } from './shortener.entity';

const url = faker.internet.url();

describe('Create ShortURL Tests', () => {
  test('constructor whit props', () => {
    const shortener = Shortener.create(url);
    expect(shortener).toHaveProperty('id');
    expect(shortener).toHaveProperty('url');
    expect(shortener).toHaveProperty('shortURL');
    expect(shortener).toHaveProperty('createdAt');
  });
  test('constructor whitout props', () => {
    const shortener = Shortener.create();
    expect(shortener.id).toBeUndefined();
    expect(shortener.createdAt).toBeUndefined();
    expect(shortener.url).toBeUndefined();
    expect(shortener.shortURL).toBeUndefined();
  });
});

describe('Patient toJSON Tests', () => {
  let shortener = Shortener.create(url);
  test('toJSON method', () => {
    const json = shortener.toJSON();
    expect(json).toStrictEqual({
      id: shortener.id,
      url: shortener.url,
      shortURL: shortener.shortURL,
      createdAt: shortener.createdAt,
    });
  });
});
