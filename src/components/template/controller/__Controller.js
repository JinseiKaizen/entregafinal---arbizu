const __Services = require("../services/__Service");

class Undifine {

  async get(req, res, next) {
    try {
      const { id } = req.params;
      const response = await __Services.get(id);
      res.json(response);
    } catch (error) {
      next(error);
    }

  }

  async getAll(req, res, next) {
    try {
      const response = await __Services.get();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const response = await __Services.create(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Undifine();