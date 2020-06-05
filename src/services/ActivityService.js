import BaseService from "./BaseService";
import ActivityRepository from "../repositories/RoutineRepository";

class ActivityService extends BaseService {
  constructor() {
    super(new ActivityRepository());
  }
}

export default ActivityService;
