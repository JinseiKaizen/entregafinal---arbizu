
const userService = require("../services/userService");

class User {

  async getAll(req, res, next) {
    try {
      const response = await userService.getAll();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.params;
      const response = await userService.get(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const response = await userService.create(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteUsersInactivity(req, res, next) {
    try {
      const users = await userService.get();
      const now = new Date();
      const twoDaysAgo = new Date(now.getTime() - (1000 * 60 * 60 * 24 * 2));
      const inactiveUsers = users.filter((user) => {
        return user.lastLogin < twoDaysAgo;
      });

      for (const user of inactiveUsers) {
        await userService.delete(user._id);
        await sendInactivityEmail(user);
      }

      res.json({ message: "Usuarios inactivos eliminados correctamente" });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await userService.delete(id);
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  }

   async sendInactivityEmail(user) {
    const transporter = require("nodemailer").createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "YOUR_EMAIL_ADDRESS",
        pass: "YOUR_EMAIL_PASSWORD",
      },
    });

    const mailOptions = {
      from: "YOUR_EMAIL_ADDRESS",
      to: user.email,
      subject: "Cuenta eliminada por inactividad",
      text: `
        Estimado/a ${user.name},

        Su cuenta ha sido eliminada por inactividad.

        Si desea recuperar su cuenta, puede ponerse en contacto con el administrador del sitio web.

        Saludos,

        El equipo del sitio web
      `,
    };

    await transporter.sendMail(mailOptions);
  }

  async getAllInactive(req, res, next) {
    try {
      const inactiveUsers = await userService.getInactiveUsers();
      res.json(inactiveUsers);
    } catch (error) {
      next(error);
    }
  }
  
  
}

module.exports = new User();
