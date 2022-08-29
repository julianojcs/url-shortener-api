import { ShortenerInterface } from "../domain/shortener.entity"
import { ShortenerRepositoryInterface } from "../domain/shortener.repository";

export class ListAllShortenersUseCase {
  constructor(private shortenerRepo: ShortenerRepositoryInterface) {}

  async execute(): Promise<ShortenerInterface[]> {
    const shorteners = await this.shortenerRepo.findAll();
    return shorteners.map((shortener) => shortener.toJSON());
  }
}