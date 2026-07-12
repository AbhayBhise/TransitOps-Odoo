export class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create({ data });
  }

  async findAll(query = {}) {
    return await this.model.findMany(query);
  }

  async findById(id) {
    return await this.model.findUnique({ where: { id } });
  }

  async update(id, data) {
    return await this.model.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return await this.model.delete({
      where: { id }
    });
  }
}
