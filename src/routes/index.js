const authApi = require('../components/auth');
const cartpi = require('../components/cart');
const companyApi = require('../components/company');
const orderApi = require('../components/order');
const roleApi = require('../components/roles');
const statusApi = require('../components/status');
const userApi = require('../components/user');
const mailerApi = require('../components/mailer');

module.exports = app => {
  authApi(app);
  userApi(app);
  roleApi(app);
  cartpi(app);
  companyApi(app);
  orderApi(app);
  statusApi(app);
  mailerApi(app);

  app.get("/", (req, res, next) => {
    res.send("Todo ok!");
  });

  app.all('*', (req, res, next) => {
    res.send("Este Request no existe");
  });
}