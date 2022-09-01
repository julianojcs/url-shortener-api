import { Shortener, dateProps, shortURLProps } from './shortener.entity';

// Inversão de Dependência
export interface ShortenerRepositoryInterface {
  // insert(url: string): Promise<void>;
  insert(shortner: Shortener): Promise<void>;
  findShortURLById(id: string): Promise<Shortener | null>;
  findAllByDate(date: dateProps): Promise<Shortener[]>;
  findURL(shortURL: shortURLProps): Promise<Shortener | null>;
  findAll(): Promise<Shortener[]>;
}
