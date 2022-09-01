import { Shortener, shortURLProps } from '../domain/shortener.entity';
import { ShortenerRepositoryInterface } from '../domain/shortener.repository';

export class FindURLUseCase {
  constructor(private shortURLRepo: ShortenerRepositoryInterface) {}

  async execute(shortURL: shortURLProps): Promise<Shortener | null> {
    const shortener = await this.shortURLRepo.findURL(shortURL);
    return shortener;
  }
}
