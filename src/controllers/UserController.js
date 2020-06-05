import BaseController from "./BaseController";
import UserService from "../services/UserService";

class UserController extends BaseController {
  constructor() {
    super();
    this._service = new UserService();
  }

  create = (req, res) => {
    try {
      var newUser = req.body;
      this._service
        .create(newUser)
        .then(user => {
          res.status(200).json({ user: user });
        })
        .catch(error => {
          const status = 401;
          const message = error;
          res.status(status).json({ status, message });
          return;
        });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send({ message: `Error to create a new ${model}`, error: e });
    }
  };
}

export default UserController;
