import { ShortenerRepositoryInterface } from '../domain/shortener.repository';
import { Shortener } from '../domain/shortener.entity';

export class FindShortURLByIdUseCase {
  constructor(private shortURLRepo: ShortenerRepositoryInterface) {}

  async execute(id: string): Promise<Shortener | null> {
    const shortener = await this.shortURLRepo.findShortURLById(id);
    return shortener;
  }
}
