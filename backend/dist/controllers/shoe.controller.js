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
exports.ShoeController = void 0;
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const shoe_repository_1 = require("../repositories/shoe.repository");
let ShoeController = class ShoeController {
    constructor(shoeRepository) {
        this.shoeRepository = shoeRepository;
    }
    async create(shoe) {
        return this.shoeRepository.create(shoe);
    }
    async find(province) {
        const where = province ? { province } : {};
        return this.shoeRepository.find({ where });
    }
    async findById(id) {
        return this.shoeRepository.findById(id);
    }
    async updateById(id, shoe) {
        await this.shoeRepository.updateById(id, shoe);
    }
    async deleteById(id) {
        await this.shoeRepository.deleteById(id);
    }
};
exports.ShoeController = ShoeController;
__decorate([
    (0, rest_1.post)('/shoes'),
    (0, rest_1.response)(200, { description: 'Shoe created' }),
    __param(0, (0, rest_1.requestBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShoeController.prototype, "create", null);
__decorate([
    (0, rest_1.get)('/shoes'),
    (0, rest_1.response)(200, { description: 'Array of shoes' }),
    __param(0, rest_1.param.query.string('province')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShoeController.prototype, "find", null);
__decorate([
    (0, rest_1.get)('/shoes/{id}'),
    (0, rest_1.response)(200, { description: 'Shoe by id' }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShoeController.prototype, "findById", null);
__decorate([
    (0, rest_1.put)('/shoes/{id}'),
    (0, rest_1.response)(204, { description: 'Shoe updated' }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, (0, rest_1.requestBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ShoeController.prototype, "updateById", null);
__decorate([
    (0, rest_1.del)('/shoes/{id}'),
    (0, rest_1.response)(204, { description: 'Shoe deleted' }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShoeController.prototype, "deleteById", null);
exports.ShoeController = ShoeController = __decorate([
    __param(0, (0, repository_1.repository)(shoe_repository_1.ShoeRepository)),
    __metadata("design:paramtypes", [shoe_repository_1.ShoeRepository])
], ShoeController);
