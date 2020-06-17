import BaseService from "./BaseService";
import ActivityRepository from "../repositories/RoutineRepository";
import { reject } from "any-promise";

class ActivityService extends BaseService {
  constructor() {
    super(new ActivityRepository());
  }

  validate = activity => {
    var { id, routineId, peopleId, title, start } = activity;

    var checkData = this._repository.find(id !== id, {
      routineId: routineId,
      peopleId: peopleId,
      title: title
    });

    if (checkData === undefined) {
      checkData = this._repository.find(id !== id, {
        routineId: routineId,
        peopleId: peopleId,
        start: start
      });
    }

    return checkData !== undefined ? false : true;
  };

  create = newActivity => {
    return new Promise((resolve, reject) => {
      if (!this.validate(newActivity)) {
        reject(new Error("Invalid data, activity exists."));
      }

      newActivity = { ...newActivity, statusId: 1 };

      var activity = this._repository.insert(newActivity);

      resolve(activity);
    });
  };

  update = activityUpdated => {
    return new Promise((resolve, reject) => {
      var activity = this._repository.getById(activityUpdated.id);

      if (activity === undefined) {
        reject(new Error("Activity not exists."));
      }

      if (
        activity.routineId !== activityUpdated.routineId ||
        activity.title !== activityUpdated.title ||
        activity.peopleId !== activityUpdated.peopleId ||
        activity.start !== activityUpdated.start
      ) {
        if (!this.validate(activityUpdated)) {
          reject(new Error("Invalid data, activity exists."));
        }
      }

      activity = this._repository.update(activityUpdated);

      resolve(activity);
    });
  };
}

export default ActivityService;
