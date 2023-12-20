const authService = require("../services/authService");

class Auth {
  
  async login(req, res, next){
    try {
      const response = await authService.login(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async recovery(req, res, next){
    try {
      let { email } = req.query;
      if( !email ) throw new Error("Debes de enviar un correo válido!");
      const response = await authService.recovery(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async resetpassword(req, res, next){
    try {
      let { token } = req.query;
      const response = await authService.resetpassword(token);
      res.json(response);
      res.render("resetpassword", {});
    } catch (error) {
      next(error);
    }
  }

  async setpassword(req, res, next){
    try {
      const { token, newPassword } = req.body;
      const response = await authService.setpassword(token, newPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Auth();