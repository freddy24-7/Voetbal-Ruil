import {ApplicationConfig} from '@loopback/core'
import {RestApplication, RestServerConfig} from '@loopback/rest'

export class BackendApplication extends RestApplication {
  constructor(options: ApplicationConfig = {}) {
    super(options)
  }
}

export async function main(config: ApplicationConfig = {}) {
  const app = new BackendApplication({
    rest: {
      port: 3001,
      host: '0.0.0.0',
    } as RestServerConfig,
    ...config,
  })

  await app.start()
  const url = app.restServer.url
  console.log(`Backend is running at ${url}`)
  return app
}

if (require.main === module) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  main().catch(err => {
    console.error('Cannot start the application.', err)
    process.exit(1)
  })
}

