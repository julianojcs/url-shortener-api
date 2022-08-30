import { ShortenerRepositoryInterface } from '../domain/shortener.repository';
import { ShortenerInterface } from '../domain/shortener.entity';

export class FindAllShortURLsByDateUseCase {
  constructor(private shortURLRepo: ShortenerRepositoryInterface) {}

  async execute(date: Date): Promise<string[]> {
    const shortURLList: ShortenerInterface[] =
      await this.shortURLRepo.findAllByDate(date);
    return shortURLList.map((shortURL) => shortURL.shortURL);
  }
}
