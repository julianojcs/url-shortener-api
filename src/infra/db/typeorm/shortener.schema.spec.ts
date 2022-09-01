import { dataSource } from './dataSource';
import { Shortener, urlProps } from '../../../domain/shortener.entity';

beforeEach(async () => {
  await dataSource.initialize();
});
afterEach(async () => {
  await dataSource.destroy();
});

describe('ShortenerSchema Tests', () => {
  test('should create a new shortener', async () => {
    const url: urlProps = {
      url: 'https://www.google.com'
    };
    const shortener = Shortener.create(url);
    const shortenerRepo = dataSource.getRepository(Shortener);
    await shortenerRepo.save(shortener);
    const shortenerFound = await shortenerRepo.findOneBy({ id: shortener.id });

    expect(shortener).toHaveProperty('id');
    expect(shortener).toHaveProperty('url');
    expect(shortener).toHaveProperty('shortURL');
    expect(shortener).toHaveProperty('createdAt');
    expect(shortenerFound).toStrictEqual(shortener);
  });
});
