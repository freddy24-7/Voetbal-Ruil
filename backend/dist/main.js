"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const application_1 = require("./application");
async function main(config = {}) {
    var _a, _b;
    const app = new application_1.BackendApplication({
        rest: {
            port: Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001),
            host: "0.0.0.0",
            cors: {
                origin: (_b = process.env.CORS_ORIGIN) !== null && _b !== void 0 ? _b : "*",
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            },
        },
        ...config,
    });
    await app.start();
    console.log(`Backend running at ${app.restServer.url}`);
    return app;
}
if (require.main === module) {
    main().catch((err) => {
        console.error("Cannot start the application.", err);
        process.exit(1);
    });
}
