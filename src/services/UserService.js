import BaseService from "./BaseService";
import UserRepository from "../repositories/UserRepository";

class UserService extends BaseService {
  constructor() {
    super(new UserRepository());
  }

  find = filter => {
    return new Promise((resolve, reject) => {
      var user = this._repository.find(filter);

      if (user === undefined) {
        reject(new Error("User not exists"));
      }

      resolve(user);
    });
  };

  create = newUser => {
    return new Promise((resolve, reject) => {
      var user = this._repository.find(
        { name: newUser.name } || { email: newUser.email } || {
            cpf: newUser.cpf
          }
      );

      if (user) {
        reject(new Error("User exists"));
      }

      var user = this._repository.insert(newUser);

      resolve(user);
    });
  };

  update = userData => {
    return new Promise((resolve, reject) => {
      var user = this._repository.getById(userData.id);

      if (!user) {
        throw new Error("User not exists");
      }

      user = this._repository.update(userData);

      resolve(user);
    });
  };
}

export default UserService;
