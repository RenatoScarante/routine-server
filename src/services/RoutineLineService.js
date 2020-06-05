import BaseService from "./BaseService";
import RoutineLineRepository from "../repositories/RoutineLineRepository";

class RoutineLineService extends BaseService {
  constructor() {
    super(new RoutineLineRepository());
  }
}

export default RoutineLineService;
