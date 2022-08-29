import { Shortener } from "../domain/shortener.entity";
import { ShortenerInMemoryRepository } from "../infra/db/in-memory/shortener-in-memory.repository";
import { CreateShortURLUseCase } from "./create-shorturl.use-case";

const url: string = "https://www.google.com";

const repository = new ShortenerInMemoryRepository();

describe('CreateShortURLUseCase Tests', () => {
  it('should create a new shortURL', async () => {
    const createShortURLUseCase = new CreateShortURLUseCase(repository);
    const shortener = await createShortURLUseCase.execute(url);

    expect(repository.items).toHaveLength(1);
    expect(shortener).toStrictEqual({
      id: repository.items[0].id,
      url: repository.items[0].url,
      shortURL: repository.items[0].shortURL,
      createdAt: repository.items[0].createdAt
    });
    expect(shortener).toStrictEqual(repository.items[0].toJSON());

    const urlFound = await repository.findURL(shortener.shortURL);
    expect(urlFound).toBe(url);
  });
})