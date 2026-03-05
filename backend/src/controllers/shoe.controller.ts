import { repository } from "@loopback/repository"
import { del, get, param, post, put, requestBody, response } from "@loopback/rest"

import { Shoe } from "../models/shoe.model"
import { ShoeRepository } from "../repositories/shoe.repository"

export class ShoeController {
  constructor(
    @repository(ShoeRepository)
    public shoeRepository: ShoeRepository
  ) {}

  @post("/shoes")
  @response(200, { description: "Shoe created" })
  async create(@requestBody() shoe: Omit<Shoe, "id">): Promise<Shoe> {
    return this.shoeRepository.create(shoe)
  }

  @get("/shoes")
  @response(200, { description: "Array of shoes" })
  async find(@param.query.string("province") province?: string): Promise<Shoe[]> {
    const where = province ? { province } : {}
    return this.shoeRepository.find({ where })
  }

  @get("/shoes/{id}")
  @response(200, { description: "Shoe by id" })
  async findById(@param.path.number("id") id: number): Promise<Shoe> {
    return this.shoeRepository.findById(id)
  }

  @put("/shoes/{id}")
  @response(204, { description: "Shoe updated" })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody() shoe: Partial<Shoe>
  ): Promise<void> {
    await this.shoeRepository.updateById(id, shoe)
  }

  @del("/shoes/{id}")
  @response(204, { description: "Shoe deleted" })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
    await this.shoeRepository.deleteById(id)
  }
}
