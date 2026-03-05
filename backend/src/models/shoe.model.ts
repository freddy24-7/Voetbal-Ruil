import {Entity, model, property} from '@loopback/repository'

@model({settings: {mysql: {table: 'shoe'}}})
export class Shoe extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: 'string',
    required: true,
  })
  title!: string

  @property({
    type: 'string',
    required: true,
  })
  size!: string

  @property({
    type: 'string',
    required: true,
  })
  province!: string

  @property({
    type: 'string',
  })
  image?: string

  constructor(data?: Partial<Shoe>) {
    super(data)
  }
}

export interface ShoeRelations {}
export type ShoeWithRelations = Shoe & ShoeRelations
