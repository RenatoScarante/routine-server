import BaseController from "./BaseController";

class ApiController extends BaseController {
  constructor() {
    super(null);
  }

  apiVersion = (req, res, next) => {
    this.success(res, {
      name: process.env.API_NAME,
      version: process.env.API_VERSION
    });
  };

  postSet = (req, res, next) => {
    if (req.method === "POST") {
      (req.body.createdAt = new Date()), (req.body.updatedAt = new Date());
    }
    // Continue to JSON Server router
    next();
    return;
  };

  putSet = (req, res, next) => {
    if (req.method === "PUT") {
      req.body.updatedAt = new Date();
    }
    // Continue to JSON Server router
    next();
    return;
  };
}

export default ApiController;
