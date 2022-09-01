import { ShortenerRepositoryInterface } from '../domain/shortener.repository';
import { Shortener, dateProps } from '../domain/shortener.entity';

export class FindAllShortURLsByDateUseCase {
  constructor(private shortURLRepo: ShortenerRepositoryInterface) {}

  async execute(date: dateProps): Promise<Shortener[]> {
    const shortenerList = await this.shortURLRepo.findAllByDate(date);
    return shortenerList;
  }
}
