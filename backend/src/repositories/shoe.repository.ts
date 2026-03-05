import { inject } from "@loopback/core"
import { DefaultCrudRepository } from "@loopback/repository"

import { MysqlDataSource } from "../datasources/mysql.datasource"
import { Shoe, ShoeRelations } from "../models/shoe.model"

export class ShoeRepository extends DefaultCrudRepository<
  Shoe,
  typeof Shoe.prototype.id,
  ShoeRelations
> {
  constructor(@inject("datasources.mysql") dataSource: MysqlDataSource) {
    super(Shoe, dataSource)
  }
}
