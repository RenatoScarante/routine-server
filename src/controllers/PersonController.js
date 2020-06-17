import BaseController from "./BaseController";
import PersonService from "../services/PersonService";

class PersonController extends BaseController {
  constructor() {
    super(new PersonService());
  }

  create = (req, res) => {
    var newPerson = req.body;

    try {
      this._service
        .create(newPerson)
        .then(person => {
          this.success(res, person);
        })
        .catch(error => {
          this.error401(res, error.message);
        });
    } catch (e) {
      this.error500(res, `Error to create a new person, ${error.message}`);
    }
  };

  update = (req, res) => {
    var personUpdated = req.body;

    try {
      this._service
        .update(personUpdated)
        .then(person => {
          this.success(res, person);
        })
        .catch(error => {
          this.error401(res, error.message);
        });
    } catch (error) {
      this.error500(
        res,
        `Error to create a update a person id ${personUpdated.id}, ${error.message}`
      );
    }
  };

  delete = (req, res) => {
    var personId = req.params.id * 1;
    var force = req.query.force === "true" ? true : false;

    try {
      this._service
        .delete(personId, force)
        .then(person => {
          this.success(res, person);
        })
        .catch(error => {
          this.error401(res, error.message);
        });
    } catch (error) {
      this.error500(
        res,
        `Error to create a update a person id ${personUpdated.id}, ${error.message}`
      );
    }
  };
}

export default PersonController;
