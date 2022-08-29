// import { Entity, Column, PrimaryGeneratedColumn, EntitySchema, EntityTarget, CreateDateColumn } from 'typeorm'
import { EntitySchema } from 'typeorm'
import { Shortener } from '../../../domain/shortener.entity'

// @Entity({name: 'shortener'})
// export class Shortener {
//     @PrimaryGeneratedColumn()
//     id: number
//
//     @Column({ name: 'url', length: 256, type: 'string', nullable: false })
//     url: string
//
//     @Column({ name: 'shortURL', length: 50, type: 'string', nullable: false })
//     shortURL: string
//
//     @CreateDateColumn({ name: 'createdAt' })
//     createdAt?: Date
// }

export const ShortenerSchema = new EntitySchema<Shortener>({
  name: 'shortener',
  target: Shortener,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    url: {
      type: String,
      length: 256,
      nullable: false,
    },
    shortURL: {
      type: String,
      nullable: false,
    },
    createdAt: {
      type: Date,
      nullable: false,
    }
  }
})