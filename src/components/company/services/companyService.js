const companyModel = require("../../../models/mongoose/company");

class Company {
  async get(id = null) {
    return id ? await companyModel.findById(id) : await companyModel.find({});
  }

  async create(payload) {
    return await companyModel.create(payload);
  }
}

module.exports = new Company();