const { Router } = require("express");
const statusController = require("./controller/statusController");
module.exports = (app) =>{
    const router = new Router();
    app.use('/status', router);
    router.get('/', statusController.getAll);
    router.post('/', statusController.create);
}