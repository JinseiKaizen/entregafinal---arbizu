const { Router } = require("express");
const productController = require("./controller/productController");
module.exports = (app) =>{
    const router = new Router();
    app.use('/product', router);
    router.get('/', productController.getAll);
    router.get('/:product_id', productController.get);
    router.post('/', productController.create);
    router.post('/', productController.delete);
}