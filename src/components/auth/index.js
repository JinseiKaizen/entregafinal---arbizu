const { Router } = require("express");
const authController = require("./controller/authController");
module.exports = (app) => {
  const router = new Router();
  app.use('/auth', router);
  router.get("/resetpassword", authController.resetpassword);
  router.post("/setpassword", authController.setpassword);
  router.post("/login", authController.login);
  router.get("/recovery", authController.recovery);
}