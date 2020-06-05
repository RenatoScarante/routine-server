import BaseService from "./BaseService";
import UserService from "./UserService";

class AuthService extends BaseService {
  constructor() {
    super(null);

    this._userService = new UserService();
  }

  checkUserCredentials = (email, password) => {
    var user = this._userService.find({ email, password });

    if (user === undefined) {
      return false;
    }

    return true;
  };

  checkUserActive = (email, password) => {
    var user = this._userService.find({ email, password });

    return user === undefined ? false : user.active;
  };

  login = (email, password) => {
    return new Promise((resolve, reject) => {
      this._userService
        .find({ email, password })
        .then(user => {
          if (user.active === false) {
            reject(new Error("User not active"));
          }

          this._userService
            .update({ ...user, lastLogin: new Date() })
            .then(user => {
              resolve({ ...user, password: null });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(new Error(`Invalid email or password, ${error.message}`));
        });
    });
  };

  register = newUser => {
    return new Promise((resolve, reject) => {
      this._userService
        .create(newUser)
        .then(user => resolve(user))
        .catch(error => reject(error));
    });
  };
}

export default AuthService;
