import { DataSource } from "typeorm";
import { ShortenerSchema } from "./shortener.schema";

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './src/database.sqlite',
  synchronize: true,
  logging: true,
  entities: [ShortenerSchema],
})

export const dataSourceInMemory = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [ShortenerSchema],
})