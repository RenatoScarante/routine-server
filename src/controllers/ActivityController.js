import BaseController from "./BaseController";
import ActivityService from "../services/ActivityService";

class ActivityController extends BaseController {
  constructor() {
    super(new ActivityService());
  }

  create = (req, res) => {
    var newActivity = req.body;

    try {
      this._service
        .create(newActivity)
        .then(activity => {
          this.success(res, activity);
        })
        .catch(error => {
          this.error401(res, error.message);
        });
    } catch (error) {
      this.error500(res, `Error to create a new activity, ${error.message}`);
    }
  };

  update = (req, res) => {
    var activityUpdated = req.body;

    try {
      this._service
        .update(activityUpdated)
        .then(activity => {
          this.success(res, activity);
        })
        .catch(error => {
          this.error401(res, error.message);
        });
    } catch (error) {
      this.error500(
        res,
        `Error to update a activity id: ${activityUpdated.id}, ${error.message}`
      );
    }
  };
}

export default ActivityController;
