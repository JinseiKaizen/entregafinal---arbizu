const roleModel = require("../../../models/mongoose/role");

class Undifine {
  async get(id = null) {
    return id ? await roleModel.findById(id) : await roleModel.find({});
  }

  async create(payload) {
    return await roleModel.create(payload);
  }
}

module.exports = new Undifine();