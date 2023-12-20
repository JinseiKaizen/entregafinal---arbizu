const cartModel = require("../../../models/mongoose/cart");
const { STATUS } = require("../../../utils/constants");

class Cart {
  static instancia;
  static ordered;
  static active;
  constructor(){
    if(Cart.instancia) return Cart.instancia;
    Cart.instancia = this;
  }

  async setInitStatus(){
    const _STATUS = await STATUS();
    Cart.active = _STATUS.ACTIVE;
    Cart.ordered = _STATUS.ORDERED;
  }

  async getByUseID(user_id){
    return await cartModel.findOne({user_id, status_id: Cart.active});
  }
  async get(id = null) {
    return id ? await cartModel.findById(id) : await cartModel.find({});
  }

  async create(user_id, payload) {
    let cart = await this.getByUseID(user_id);
    if(cart?.user_id){
      cart.products.push(payload);
      this.update(user_id, {products: cart.products});
    }else {
      return await cartModel.create({
        user_id,
        status_id: Cart.active,
        products: [payload],
        createdAt: Date.now()
      });
    }
    
  }

  async update(user_id, payload){
    return await cartModel.updateOne({user_id}, {...payload}, { new: true });
  }

  async toOrder(user_id){
    return await cartModel.updateOne(
      { user_id, status_id: Cart.active },
      { status_id: Cart.ordered },
      { new: true }
    );
  }
}

module.exports = new Cart();