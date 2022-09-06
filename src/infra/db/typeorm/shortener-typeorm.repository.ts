import {
  Shortener,
  dateProps,
  shortURLProps
} from '../../../domain/shortener.entity';
import { Repository, Raw } from 'typeorm';
import { ShortenerRepositoryInterface } from '../../../domain/shortener.repository';

export class ShortenerTypeOrmRepository
  implements ShortenerRepositoryInterface
{
  constructor(private ormRepo: Repository<Shortener>) {}

  async findShortURLById(id: string): Promise<Shortener | null> {
    const result = await this.ormRepo.find({
      select: {
        id: true,
        url: true,
        shortURL: true,
        createdAt: true
      },
      where: {
        id: id
      }
    });
    if (!result.length) {
      return null;
    }
    return result[0];
  }

  async findAllByDate(props: dateProps): Promise<Shortener[]> {
    const { date } = props;
    const dateArg = new Date(new Date(date).toLocaleDateString('en-US'));
    const result = await this.ormRepo.findBy({
      createdAt: Raw((createdAt) => `${createdAt} == :date`, { date: dateArg })
    });
    return result;
  }

  async findURL(props: shortURLProps): Promise<Shortener | null> {
    const { shortURL } = props;
    const result = await this.ormRepo.find({
      select: {
        id: true,
        url: true,
        shortURL: true,
        createdAt: true
      },
      where: {
        shortURL: shortURL
      },
      order: {
        createdAt: 'DESC'
      }
    });
    if (!result.length) {
      return null;
    }
    return result[0];
  }

  async insert(shortener: Shortener): Promise<void> {
    await this.ormRepo.save(shortener);
  }

  async findAll(): Promise<Shortener[]> {
    return this.ormRepo.find({
      order: {
        createdAt: 'DESC'
      }
    });
  }
}
