import { Shortener } from './shortener.entity';

// Inversão de Dependência
export interface ShortenerRepositoryInterface {
  // insert(url: string): Promise<void>;
  insert(shortner: Shortener): Promise<void>;
  findShortURLById(id: string): Promise<string | null>;
  findAllByDate(date: Date): Promise<Shortener[]>;
  findURL(shortURL: string): Promise<string | null>;
  findAll(): Promise<Shortener[]>;
}