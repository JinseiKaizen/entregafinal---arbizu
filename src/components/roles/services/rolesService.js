const roleModel = require("../../../models/mongoose/role");
const { ROLES } = require("../../../utils/constants");
class Role {
  static instance;
  static admin;
  static premium;
  static user;
  static company;

  constructor(){
    if(Role.instance) return Role.instance;
    Role.instance = this;
    this.setInitStatus();
  }

  get admin(){ return Role.admin }
  get premium(){ return Role.admin }
  get user(){ return Role.admin }
  get company(){ return Role.admin }

  async setInitStatus(){
    const _ROLES = await ROLES();
    Role.admin = _ROLES.ADMIN;
    Role.premium = _ROLES.PREMIUM;
    Role.user = _ROLES.USER;
    Role.company = _ROLES.COMPANY;
  }

  async get(id = null) {
    return id ? await roleModel.findById(id) : await roleModel.find({});
  }

  async create(payload) { 
    return await roleModel.create(payload);
  }
}

module.exports = new Role();