import BaseController from "./BaseController";
import UserService from "../services/UserService";

class UserController extends BaseController {
  constructor() {
    super(new UserService());
  }

  create = (req, res) => {
    try {
      var newUser = req.body;
      this._service
        .create(newUser)
        .then(user => {
          this.success(res, user);
        })
        .catch(error => {
          this.error401(res, error.message);
          return;
        });
    } catch (e) {
      this.error500(res, `Error to create a new user, ${error.message}`);
    }
  };
}

export default UserController;
