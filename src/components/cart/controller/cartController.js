const cartService = require("../services/cartService");

class Cart {

  async getCart(req, res, next) {
    try {
      const response = await cartService.getByUseID(req.user._id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const response = await cartService.create(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Cart();