import { Shortener } from "../../../domain/shortener.entity";
import { Repository, Raw } from "typeorm";
import { ShortenerRepositoryInterface } from "../../../domain/shortener.repository";
import { format, toDate } from 'date-fns';

export class ShortenerTypeOrmRepository
  implements ShortenerRepositoryInterface
{
  constructor(private ormRepo: Repository<Shortener>) {}

  async findShortURLById(id: string): Promise<string | null> {
    const result = await this.ormRepo.find({
      select: {
        shortURL: true,
      },
      where: {
        id: id,
      },
    });
    if (result.length === 0) {
      return null;
    } else {
      return result[0].shortURL;
    }
  }

  async findAllByDate(date: Date): Promise<Shortener[]> {
    const dateArg = new Date(new Date(date).toLocaleDateString('en-US'));
    const result = await this.ormRepo.findBy({
      createdAt: Raw((createdAt) => `${createdAt} == :date`, { date: dateArg }),
    });
    return result;
  }

  async findURL(shortURL: string): Promise<string | null> {
    const result = await this.ormRepo.find({
      select: {
        url: true,
      },
      where: {
        shortURL: shortURL,
      },
    });
    if (result.length === 0) {
      return null;
    } else {
      return result[0].url;
    }
  }

  async insert(shortener: Shortener): Promise<void> {
    await this.ormRepo.save(shortener);
  }

  async findAll(): Promise<Shortener[]> {
    return this.ormRepo.find();
  }
}