import BaseService from "./BaseService";
import RoutineRepository from "../repositories/RoutineRepository";

class RoutineService extends BaseService {
  constructor() {
    super(new RoutineRepository());
  }

  validate = routine => {
    var { id, userId, name } = routine;

    var checkData = this._repository.find(id !== id, {
      userId: userId,
      name: name
    });

    return checkData !== undefined ? false : true;
  };

  create = newRoutine => {
    return new Promise((resolve, reject) => {
      if (!this.validate(newRoutine)) {
        reject(new Error("Routine exists."));
      }

      var routine = this._repository.insert(newRoutine);

      resolve(routine);
    });
  };

  list = userId => {
    return new Promise((resolve, reject) => {
      var list = this._repository.filter({ userId: userId });

      if (list === undefined) {
        reject(new Error(`Not exists routines from user id ${userId}`));
      }

      resolve(list);
    });
  };
}

export default RoutineService;
