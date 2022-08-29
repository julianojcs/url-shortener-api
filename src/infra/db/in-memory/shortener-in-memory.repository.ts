import { Shortener } from "../../../domain/shortener.entity";
import { ShortenerRepositoryInterface } from "../../../domain/shortener.repository";
import { format } from 'date-fns'

export class ShortenerInMemoryRepository implements ShortenerRepositoryInterface {
  items: Shortener[] = [];

  async findShortURLById(id: string): Promise<string | null> {
    const result = this.items.filter((item) => item.id === id);
    if (result.length === 0) {
      return null;
    } else {
      return result[0].shortURL;
    }
  }

  async findAllByDate(date: Date): Promise<Shortener[]> {
    return this.items.filter(
      (item) =>
        format(item.createdAt, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy'),
    );
  }

  async findURL(shortURL: string): Promise<string | null> {
    const result = this.items.filter((item) => item.shortURL === shortURL);
    if (result.length === 0) {
      return null;
    } else {
      return result[0].url;
    }
  }

  async insert(shortener: Shortener): Promise<void> {
    this.items.push(shortener);
  }

  async findAll(): Promise<Shortener[]> {
    return this.items;
  }
}