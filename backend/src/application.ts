import {ApplicationConfig} from '@loopback/core'
import {RepositoryMixin} from '@loopback/repository'
import {RestApplication, RestServerConfig} from '@loopback/rest'
import {ShoeController} from './controllers/shoe.controller'
import {MysqlDataSource} from './datasources/mysql.datasource'
import {ShoeRepository} from './repositories/shoe.repository'

export class BackendApplication extends RepositoryMixin(RestApplication) {
  constructor(options: ApplicationConfig = {}) {
    super(options)
    this.dataSource(MysqlDataSource)
    this.repository(ShoeRepository)
    this.controller(ShoeController)
  }
}
