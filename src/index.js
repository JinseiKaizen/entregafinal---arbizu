const express = require("express");
const sessions = require("express-session");
const expressSessionId = require("express-session-id");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const path = require("path");
const { config, mongo } = require("./config");
const ServerRoutes = require("./routes");
const MongoDB = require("./config/mongoDB");
const ErrorMiddleware = require("./utils/middlewares/ErrorMiddleware");

class Server {
  constructor() {
    this.app = express();
    this.middlewares();
    this.settings();
    this.routes();
    this.errorMiddlewares();
    this.mongoDb = new MongoDB();
  }

  middlewares(){
    this.app.use(sessions({
      store: MongoStore.create({
        mongoUrl: mongo.mongo_atlas,
        mongoOptions: { useUnifiedTopology: true },
        ttl: 14 * 24 * 60 * 60, // = 14 days. Default
        touchAfter: 24 * 3600 // time period in seconds
      }),
      secret: config.session_key,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
      genid: expressSessionId()
    }));
    this.app.use(cors());
  }

  settings(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.static(path.resolve(__dirname, 'public')));
  }

  routes(){
    ServerRoutes(this.app);
  }

  errorMiddlewares(){
    this.app.use(ErrorMiddleware.logErrors);
    this.app.use(ErrorMiddleware.boomHandler);
    this.app.use(ErrorMiddleware.errorHanlder);
  }

  listen(){
    this.app.listen(config.port, (e) => console.log(`http://localhost:${config.port}`))
  }

}

module.exports = new Server();