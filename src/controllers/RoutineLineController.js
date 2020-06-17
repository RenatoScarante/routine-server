import BaseController from "./BaseController";
import RoutineLineService from "../services/RoutineLineService";

class RoutineLineController extends BaseController {
  constructor() {
    super(new RoutineLineService());
  }

  create = (req, res) => {
    var newRoutineLine = req.body;

    try {
      this._service
        .create(newRoutineLine)
        .then(routineLine => {
          this.success(res, routineLine);
        })
        .catch(error => {
          this.error401(res, error.message);
        });
    } catch (e) {
      this.error500(
        res,
        `Error to create a new routine line, ${error.message}`
      );
    }
  };

  update = (req, res) => {
    var routineLineUpdated = req.body;

    try {
      this._service
        .update(routineLineUpdated)
        .then(routineLine => {
          this.success(res, routineLine);
        })
        .catch(error => {
          this.error401(res, error.message);
        });
    } catch (error) {
      this.error500(
        res,
        `Error to create a update a routine line id ${routineLineUpdated.id}, ${error.message}`
      );
    }
  };
}
