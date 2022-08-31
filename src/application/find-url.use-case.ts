import { ShortenerRepositoryInterface } from '../domain/shortener.repository';

export class FindURLUseCase {
  constructor(private shortURLRepo: ShortenerRepositoryInterface) {}

  async execute(shortURL: string): Promise<string | null> {
    const url = await this.shortURLRepo.findURL(shortURL);
    return url;
  }
}
