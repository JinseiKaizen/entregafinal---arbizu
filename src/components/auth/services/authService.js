
const userService = require("../../user/services/userService");
const JWTService = require("../../../utils/JWT/jwt");
const { createHash, isValidPassword } = require("../../../utils/bcrypt");
const { generateJWT, verify, decode } = require("../../../utils/JWT/jwt");
const PasswordResetModel = require("../../../models/mongoose/passwordReset");
const { config } = require("../../../config");
const MailManager = require("../../../utils/mailManager");
class Auth {

  async login({email, password}){
    const user = await userService.findByEmail(email);
    if(!user) return {status:401, response: "Autorización no válida."};
    if(!isValidPassword(password, user)) return {status:403, response: "Autorización no válida."}
    const token = await JWTService.generateJWT({id: user._id});
    return await userService.updateUser(user._id, {token});
  }

  async recovery(email){
    const user = await userService.findByEmail(email);
    if(!user) throw new Error("El email no existe");
    

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    const passwordResetInserted = await PasswordResetModel.create({
      email: user.email,
      expires: expires,
      createdAt: new Date()
    });

    const token = await generateJWT({id: passwordResetInserted._id});
    
    const htmlResetEmail = 
      `<h1>Hola ${user.name}</h1>
      <p>
        Haz click para restablecer la contraseña <a href="http://localhost:3000/auth/resetpassword?token=${token}">ENLACE</a>
      </p>`;

      await MailManager.sendEmail(
        {
          from: config.nodemailer_user,
          to: "amanzano@tomi.digital",
          subject: 'Restablecer Contraseña',
          html: htmlResetEmail,
        }
      );
    return {code: 200, message: "Te hemos enviado un correo con las indicaciones!"};
  }

  async resetpassword(token){
    if(!(await verify(token))) throw new Error("Token no válido");
    let payload = await decode(token);
    let passwordResetInfo = await PasswordResetModel.findById(payload.id);
    if(!passwordResetInfo || passwordResetInfo?.expires < new Date()) throw new Error("El enlace ya cáduco");
    return {status: true, email: passwordResetInfo.email};
  }

  async setpassword(token, newPassword){
    try{
      let resetInfo = await this.resetpassword(token);
      const user = await userService.findByEmail(resetInfo.email);
      if(isValidPassword(newPassword, user)) throw new Error("No puedes colocar la misma contraseña");
      await userService.update(user._id, {password: createHash(newPassword)});
      return {message: "Se ha actualizado tu correo con Exito!"};
    } catch(e){
      throw new Error(e.message);
    }
  }

}

module.exports = new Auth();