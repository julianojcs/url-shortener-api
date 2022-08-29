// import { dataSourceInMemory as dataSource } from './dataSource';
import { dataSource } from './dataSource';
import { Shortener } from '../../../domain/shortener.entity'

const url: string = "https://www.google.com";

beforeEach(async () => {
  await dataSource.initialize();
});
afterEach(async () => {
  await dataSource.destroy();
});

describe('ShortenerSchema Tests', () => {
  test('should create a new shortener', async () => {
    const shortener = Shortener.create(url);
    const shortenerRepo = dataSource.getRepository(Shortener)
    await shortenerRepo.save(shortener)

    expect(shortener.id).toBeDefined();
    expect(shortener.url).toBe(url);
    expect(shortener.shortURL).toBeDefined();
    expect(shortener.createdAt).toBeDefined();
    expect(await shortenerRepo.findOneBy({ id: shortener.id })).toStrictEqual(shortener);
  })
});