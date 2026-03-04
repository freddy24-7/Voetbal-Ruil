import {ApplicationConfig} from '@loopback/core'
import {RestServerConfig} from '@loopback/rest'
import {BackendApplication} from './application'

export async function main(config: ApplicationConfig = {}) {
  const app = new BackendApplication({
    rest: {
      port: 3001,
      host: '0.0.0.0',
      cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      },
    } as RestServerConfig,
    ...config,
  })

  await app.start()
  console.log(`Backend running at ${app.restServer.url}`)
  return app
}

if (require.main === module) {
  main().catch(err => {
    console.error('Cannot start the application.', err)
    process.exit(1)
  })
}
