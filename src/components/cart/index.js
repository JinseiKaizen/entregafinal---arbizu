const { Router } = require("express");
const cartController = require("./controller/cartController");
const { getAuthenticatedUser } = require("../../utils/middlewares/AuthMiddleware");
module.exports = (app) =>{
    const router = new Router();
    app.use('/cart', router);
    router.use(getAuthenticatedUser);
    router.get('/', cartController.getCart);
    router.post('/', cartController.create);
}