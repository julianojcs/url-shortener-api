import { ShortenerRepositoryInterface } from '../domain/shortener.repository';

export class ListAllShortURLsUseCase {
  constructor(private shortURLRepo: ShortenerRepositoryInterface) {}

  async execute(): Promise<string[]> {
    const shorteners = await this.shortURLRepo.findAll();
    return shorteners.map((shortener) => shortener.shortURL);
  }
}
