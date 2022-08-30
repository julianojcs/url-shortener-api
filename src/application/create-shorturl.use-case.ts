import { Shortener } from '../domain/shortener.entity';
import { ShortenerRepositoryInterface } from '../domain/shortener.repository';

export class CreateShortURLUseCase {
  constructor(private shortURLRepo: ShortenerRepositoryInterface) {}
  async execute(url: string): Promise<string> {
    const shortURL = Shortener.create(url);
    await this.shortURLRepo.insert(shortURL);
    return shortURL.shortURL;
  }
}
