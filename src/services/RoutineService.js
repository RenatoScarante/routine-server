import BaseService from "./BaseService";
import RoutineRepository from "../repositories/RoutineRepository";

class RoutineService extends BaseService {
  constructor() {
    super(new RoutineRepository());
  }
}

export default RoutineService;
