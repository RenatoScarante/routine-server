require("dotenv").config();

import ApiController from "./controllers/ApiController";
import AuthController from "./controllers/AuthController";
import UserController from "./controllers/UserController";
import RoutineController from "./controllers/RoutineController";
import ActivityController from "./controllers/ActivityController";
import PersonController from "./controllers/PersonController";

const jsonServer = require("json-server");
const bodyParser = require("body-parser");

const server = jsonServer.create();
const router = jsonServer.router(require("./db/db.js")());

const apiController = new ApiController();
const authController = new AuthController();
const userController = new UserController();
const routineController = new RoutineController();
const activityController = new ActivityController();
const personController = new PersonController();

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(apiController.postSet);
server.use(apiController.putSet);

// Check authorization
server.use(/^(?!\/auth).*$/, authController.checkAuthorization);

// GET /api
server.get(process.env.ROUTE_API, apiController.apiVersion);

// POST /api/auth/login
server.post(process.env.ROUTE_AUTH_LOGIN, authController.login);

// POST /api/auth/register
server.post(process.env.ROUTE_AUTH_REGISTER, authController.register);

// POST /api/user
server.post(process.env.ROUTE_USER, userController.create);

// POST /api/person
server.post(process.env.ROUTE_PERSON, personController.create);

// DELETE /api/person
server.delete(`${process.env.ROUTE_PERSON}/:id`, personController.delete);

// POST /api/routine
server.post(process.env.ROUTE_ROUTINE, routineController.create);

// PUT /api/routine/:id/lines
server.put(process.env.ROUTE_ROUTINE, routineController.createLines);

// POST /api/activity
server.post(process.env.ROUTE_ACTIVITY, activityController.create);

// PUT /api/activity
server.put(process.env.ROUTE_ACTIVITY, activityController.update);

server.use(jsonServer.rewriter(require("./config/routes.json")));
server.use(process.env.ROUTE_API, router);

const port = process.env.PORT ? process.env.PORT : 5000;

server.listen(port, () => {
  console.log(`${process.env.API_NAME} is running on port ${port}`);
});
