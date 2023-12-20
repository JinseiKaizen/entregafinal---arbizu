const { Router } = require("express");
const __Controller = require("./controller/__Controller");
module.exports = (app) =>{
    const router = new Router();
    app.use('/product', router);
    router.get('/', __Controller.getAll);
    router.get('/:product_id', __Controller.get);
    router.post('/', __Controller.create);
}