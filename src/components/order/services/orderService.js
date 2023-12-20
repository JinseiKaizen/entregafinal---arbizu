const orderModel = require("../../../models/mongoose/order");
const cartService = require("../../cart/services/cartService");
const { STATUS } = require("../../../utils/constants");

class Order {
  static instace;
  static active;
  static finished;
  static cancelled;

  constructor(){
    if(Order.instace) return Order.instace;
    Order.instace = this;
    this.setInitStatus()
  }

  async setInitStatus(){
    const _STATUS = await STATUS();
    Order.active = _STATUS.ACTIVE;
    Order.finished = _STATUS.FINALIZADO;
    Order.cancelled = _STATUS.CANCELADO;
  }

  async get(id = null) {
    return id ? await orderModel.findById(id) : await orderModel.find({});
  }

  async create(user_id, payload) {
    await cartService.toOrder(user_id);
    return await orderModel.create({
      payload,
      status_id: Order.active
    });
  }

  async updateStatus(order_id, status) {
    const status_id = status.toUpperCase() === "FINISHED" ? Order.finished : Order.cancelled;
    return await orderModel.update({order_id}, { status_id });
  }
}



module.exports = new Order();