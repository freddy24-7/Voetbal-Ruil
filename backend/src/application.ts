import {ApplicationConfig} from '@loopback/core'
import {RepositoryMixin} from '@loopback/repository'
import {RestApplication} from '@loopback/rest'
import {ContactController} from './controllers/contact.controller'
import {ShoeController} from './controllers/shoe.controller'
import {MysqlDataSource} from './datasources/mysql.datasource'
import {ShoeRepository} from './repositories/shoe.repository'

export class BackendApplication extends RepositoryMixin(RestApplication) {
  constructor(options: ApplicationConfig = {}) {
    super(options)
    this.dataSource(MysqlDataSource)
    this.repository(ShoeRepository)
    this.controller(ShoeController)
    this.controller(ContactController)
  }
}
