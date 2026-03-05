"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendApplication = void 0;
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const contact_controller_1 = require("./controllers/contact.controller");
const shoe_controller_1 = require("./controllers/shoe.controller");
const mysql_datasource_1 = require("./datasources/mysql.datasource");
const shoe_repository_1 = require("./repositories/shoe.repository");
class BackendApplication extends (0, repository_1.RepositoryMixin)(rest_1.RestApplication) {
    constructor(options = {}) {
        super(options);
        this.dataSource(mysql_datasource_1.MysqlDataSource);
        this.repository(shoe_repository_1.ShoeRepository);
        this.controller(shoe_controller_1.ShoeController);
        this.controller(contact_controller_1.ContactController);
    }
}
exports.BackendApplication = BackendApplication;
