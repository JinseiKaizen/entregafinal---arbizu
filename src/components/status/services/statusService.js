const statusModel = require("../../../models/mongoose/status");

class Status {
  async get(id = null) {
    return id ? await statusModel.findById(id) : await statusModel.find({});
  }

  async create(payload) {
    return await statusModel.create(payload);
  }
}

module.exports = new Status();