const { Router } = require("express");
const companyController = require("./controller/companyController");
module.exports = (app) =>{
    const router = new Router();
    app.use('/company', router);
    router.get('/', companyController.getAll);
    router.get('/:company_id', companyController.get);
    router.post('/', companyController.create);
}