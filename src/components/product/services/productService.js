const productModel = require("../../../models/mongoose/product");

class Product {
  async get(id = null) {
    return id ? await productModel.findById(id) : await productModel.find({});
  }

  async create(payload) {
    return await productModel.create(payload);
  }

  async delete(id = null) {
    if(id) return await productModel.findByIdAndDelete(id)
    return await productModel.deleteMany({});
  }
}

module.exports = new Product();