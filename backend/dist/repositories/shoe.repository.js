"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoeRepository = void 0;
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const mysql_datasource_1 = require("../datasources/mysql.datasource");
const shoe_model_1 = require("../models/shoe.model");
let ShoeRepository = class ShoeRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(shoe_model_1.Shoe, dataSource);
    }
};
exports.ShoeRepository = ShoeRepository;
exports.ShoeRepository = ShoeRepository = __decorate([
    __param(0, (0, core_1.inject)("datasources.mysql")),
    __metadata("design:paramtypes", [mysql_datasource_1.MysqlDataSource])
], ShoeRepository);
