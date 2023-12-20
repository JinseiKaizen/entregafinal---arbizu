const { Router } = require("express");
const rolesController = require("./controller/rolesController");
module.exports = (app) =>{
    const router = new Router();
    app.use('/roles', router);
    router.get('/', rolesController.getAll);
    router.post('/', rolesController.create);
}