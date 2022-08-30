import { ShortenerRepositoryInterface } from '../domain/shortener.repository';

export class FindShortURLByIdUseCase {
  constructor(private shortURLRepo: ShortenerRepositoryInterface) {}

  async execute(id: string): Promise<string | null> {
    const shortURL = await this.shortURLRepo.findShortURLById(id);
    return shortURL;
  }
}
