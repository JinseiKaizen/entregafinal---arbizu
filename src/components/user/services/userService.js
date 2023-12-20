const userModel = require("../../../models/mongoose/user");
const companyService = require("../../company/services/companyService");
const { createHash } = require("../../../utils/bcrypt");
const { generateJWT } = require("../../../utils/JWT/jwt");
class User {
  async get(id = null) {
    return id ? await userModel.findById(id) : await userModel.find({});
  }

  async create(payload) {
    const userDTO = {
      ...payload,
      password: createHash(payload.password),
      token: ""
    }
    let user = await userModel.create(userDTO);
    let token = await generateJWT({id: user._id});
    let userUpdated = userModel.findByIdAndUpdate(user._id, {token}, { new: true });
    if(payload?.company){
      let companyDTO = {
        ...payload.company,
        users: [user._id]
      }
     const company = await companyService.create(companyDTO)
     userUpdated = {...userUpdated, company: { ...company }}
    }
    return userUpdated;
  }

  async findByEmail(email) {
    return await userModel.findOne({
      email: email
    });
  }

  async update(id,objUpdated){
    return await userModel.findByIdAndUpdate(id, {...objUpdated}, { new: true });
  }
}

module.exports = new User();