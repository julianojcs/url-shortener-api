import { faker } from '@faker-js/faker';
import { Shortener, urlProps } from './shortener.entity';

const url: urlProps = {
  url: faker.internet.url()
};

describe('Create ShortURL Tests', () => {
  test('constructor whit props', () => {
    const shortener = Shortener.create(url);
    expect(shortener).toHaveProperty('id');
    expect(shortener).toHaveProperty('url');
    expect(shortener).toHaveProperty('shortURL');
    expect(shortener).toHaveProperty('createdAt');
  });
});

describe('Shortener toJSON Tests', () => {
  let shortener = Shortener.create(url);
  test('toJSON method', () => {
    const json = shortener.toJSON();
    expect(json).toStrictEqual({
      id: shortener.id,
      url: shortener.url,
      shortURL: shortener.shortURL,
      createdAt: shortener.createdAt
    });
  });
});
