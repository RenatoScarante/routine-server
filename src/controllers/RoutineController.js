import BaseController from "./BaseController";
import RoutineService from "../services/RoutineService";
import RoutineLineService from "../services/RoutineLineService";

class RoutineController extends BaseController {
  constructor() {
    super(new RoutineService());
    this._lines = new RoutineLineService();
  }

  create = (req, res) => {
    var newRoutine = req.body;
    var createLines = req.query.createLines === "true" ? true : false;

    try {
      this._service
        .create(newRoutine)
        .then(routine => {
          if (createLines) {
            this._lines
              .createLines(routine)
              .then(lines => this.success(res, { routine, lines }))
              .catch(error => this.error401(res, error.message));
          } else {
            this.success(res, { routine });
          }
        })
        .catch(error => {
          this.error401(res, error.message);
        });
    } catch (e) {
      this.error500(res, `Error to create a new routine, ${error.message}`);
    }
  };

  createLines = (req, res) => {
    var routine = req.body;

    try {
      this._lines
        .createLines(routine)
        .then(lines => this.success(res, { routine, lines }))
        .catch(error => this.error401(res, error.message));
    } catch (e) {
      this.error500(res, `Error to create a new routine, ${error.message}`);
    }
  };

  update = (req, res) => {
    var routineUpdated = req.body;

    try {
      this._service
        .update(routineUpdated)
        .then(routine => {
          this.success(res, routine);
        })
        .catch(error => {
          this.error401(res, error.message);
        });
    } catch (error) {
      this.error500(
        res,
        `Error to update a routine id ${routineUpdated.id}, ${error.message}`
      );
    }
  };

  delete = (req, res) => {
    var routineId = req.params.id * 1;

    try {
      this._lines
        .deleteLines(routineId)
        .then(() => {
          this._service.delete(routineId);
          this.success(res, "Routine excluded");
        })
        .then(error => {
          this.error401(res, error.message);
        });
    } catch (error) {
      this.error500(
        res,
        `Error to delete a routine id ${routineUpdated.id}, ${error.message}`
      );
    }
  };

  list = (req, res) => {
    const userId = req.params.id * 1;
    const query = req.query;

    if (query._embed !== "lines") {
      next();
      return;
    }

    try {
      this._service.list(userId);
    } catch (error) {}
  };
}

export default RoutineController;
