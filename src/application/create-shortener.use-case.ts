import {
  Shortener,
  ShortenerInterface,
  urlProps
} from '../domain/shortener.entity';
import { ShortenerRepositoryInterface } from '../domain/shortener.repository';

export class CreateShortenerUseCase {
  constructor(private shortenerRepo: ShortenerRepositoryInterface) {}
  async execute(url: urlProps): Promise<ShortenerInterface> {
    const shortener = Shortener.create(url);
    await this.shortenerRepo.insert(shortener);
    return shortener.toJSON();
  }
}
