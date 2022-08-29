import { Shortener, ShortenerInterface } from "../domain/shortener.entity"
import { ShortenerRepositoryInterface } from "../domain/shortener.repository";

export class CreateShortURLUseCase {
  constructor(private shortURLRepo: ShortenerRepositoryInterface) {}
  async execute(url: string): Promise<ShortenerInterface> {
    const shortURL = Shortener.create(url);
    await this.shortURLRepo.insert(shortURL);
    return shortURL.toJSON();
  }
}