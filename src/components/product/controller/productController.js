const productService = require("../services/productService");

class Product {

  async get(req, res, next) {
    try {
      const { id } = req.params;
      const response = await productService.get(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const response = await productService.get();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const response = await productService.create(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

 async delete(req, res, next) {
  try {
    const { id } = req.params;
    const product = await productService.get(id);

    if (product.owner.role === "premium") {
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
        to: product.owner.email,
        subject: "Producto eliminado",
        text: `
          Estimado/a ${product.owner.name},

          El producto "${product.name}" ha sido eliminado.

          Saludos,

          El equipo del sitio web
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    await productService.delete(id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    next(error);
  }
}


}

module.exports = new Product();