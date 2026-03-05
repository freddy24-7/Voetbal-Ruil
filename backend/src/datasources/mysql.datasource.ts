import * as path from "path"

import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core"
import { juggler } from "@loopback/repository"
import * as dotenv from "dotenv"

dotenv.config({ path: path.resolve(__dirname, "../../../.env") })

function parseDbUrl(url: string) {
  const parsed = new URL(url)
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port) || 3306,
    user: parsed.username,
    password: parsed.password,
    database: parsed.pathname.replace(/^\//, ""),
  }
}

const dbConfig = parseDbUrl(process.env.DB_URL!)

const config = {
  name: "mysql",
  connector: "mysql",
  ...dbConfig,
}

@lifeCycleObserver("datasource")
export class MysqlDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = "mysql"
  static readonly defaultConfig = config

  constructor(
    @inject("datasources.config.mysql", { optional: true })
    dsConfig: object = config
  ) {
    super(dsConfig)
  }
}
