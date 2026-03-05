import type { ApplicationConfig } from "@loopback/core"
import type { RestServerConfig } from "@loopback/rest"

import { BackendApplication } from "./application"

export async function main(config: ApplicationConfig = {}) {
  const app = new BackendApplication({
    rest: {
      port: Number(process.env.PORT ?? 3001),
      host: "0.0.0.0",
      cors: {
        origin: process.env.CORS_ORIGIN ?? "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      },
    } as RestServerConfig,
    ...config,
  })

  await app.start()
  console.log(`Backend running at ${app.restServer.url}`)
  return app
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Cannot start the application.", err)
    process.exit(1)
  })
}
