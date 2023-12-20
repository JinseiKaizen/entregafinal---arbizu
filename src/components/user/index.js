const { Router } = require("express");
const userController = require("./controller/userController");

module.exports = (app) => {
  const router = new Router();
  app.use('/user', router);

  router.get('/:user_id', userController.get);
  router.get('/', userController.getAll);
  router.post('/', userController.create);

  router.get('/inactive', userController.getAllInactive);

  router.delete('/inactive', (req, res) => { 
    userController.deleteInactiveUsers(req, res);
  });
};
