const orderService = require("../services/orderService");

class Order {

  async get(req, res, next) {
    try {
      const { id } = req.params;
      const response = await orderService.get(id);
      res.json(response);
    } catch (error) {
      next(error);
    }

  }

  async getAll(req, res, next) {
    try {
      const response = await orderService.get();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const response = await orderService.create(req.user._id, req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { order_id, status } = req.params;
      const response = await orderService.updateStatus(order_id, status);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}



module.exports = new Order();