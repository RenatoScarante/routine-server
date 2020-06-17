import BaseService from "./BaseService";
import PersonRepository from "../repositories/PersonRepository";
import ActivityRepository from "../repositories/ActivityRepository";

class PersonService extends BaseService {
  constructor() {
    super(new PersonRepository());
    this._activityRepository = new ActivityRepository();
  }

  validate = person => {
    var checkData = this._repository.find({
      userId: person.userId,
      name: person.name
    });

    return checkData !== undefined ? false : true;
  };

  create = newPerson => {
    return new Promise((resolve, reject) => {
      if (!this.validate(newPerson)) {
        reject(new Error("Invalid data, person exists."));
      }

      var person = this._repository.insert(newPerson);

      resolve(person);
    });
  };

  update = personUpdated => {
    return new Promise((resolve, reject) => {
      var person = this._repository.getById(personUpdated.id);

      if (person === undefined) {
        reject(new Error("Person not exists."));
      }

      if (person.name !== personUpdated.name) {
        if (!this.validate(personUpdated)) {
          reject(new Error("Invalid data, person exists."));
        }
      }

      person = this._repository.update(personUpdated);

      resolve(person);
    });
  };

  delete = (personId, force) => {
    return new Promise((resolve, reject) => {
      var person = this._repository.getById(personId);

      if (person === undefined) {
        reject(new Error("Person not exists."));
        return;
      }

      if (force === false) {
        var activities = this._activityRepository.filter({
          personId: personId
        });

        if (activities !== undefined) {
          reject(new Error("Person has activities."));
          return;
        }
      } else {
        this._activityRepository.delete({
          personId: personId
        });
      }

      this._repository.delete({ id: personId });

      resolve(person);
    });
  };
}

export default PersonService;
