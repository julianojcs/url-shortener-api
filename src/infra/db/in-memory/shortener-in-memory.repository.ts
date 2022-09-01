import {
  Shortener,
  dateProps,
  shortURLProps
} from '../../../domain/shortener.entity';
import { ShortenerRepositoryInterface } from '../../../domain/shortener.repository';
import { format } from 'date-fns';

export class ShortenerInMemoryRepository
  implements ShortenerRepositoryInterface
{
  items: Shortener[] = [];

  async findShortURLById(id: string): Promise<Shortener | null> {
    const result = this.items.filter((item) => item.id === id);
    if (!result.length) {
      return null;
    }
    return result[0];
  }

  async findAllByDate(props: dateProps): Promise<Shortener[]> {
    const date = new Date(new Date(props.date).toLocaleDateString('en-US'));
    return this.items.filter(
      (item) =>
        format(item.createdAt, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy')
    );
  }

  async findURL(props: shortURLProps): Promise<Shortener | null> {
    const result = this.items.filter(
      (item) => item.shortURL === props.shortURL
    );
    if (!result.length) {
      return null;
    }
    return result[0];
  }

  async insert(shortener: Shortener): Promise<void> {
    this.items.push(shortener);
  }

  async findAll(): Promise<Shortener[]> {
    return this.items;
  }
}
