"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const application_1 = require("./application");
async function main(config = {}) {
    const app = new application_1.BackendApplication({
        rest: {
            port: 3001,
            host: '0.0.0.0',
            cors: {
                origin: '*',
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            },
        },
        ...config,
    });
    await app.start();
    console.log(`Backend running at ${app.restServer.url}`);
    return app;
}
if (require.main === module) {
    main().catch(err => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
