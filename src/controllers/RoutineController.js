const routineRepository = require("../repositories/RoutineRepository");
const activityRepository = require("../repositories/ActivityRepository");
const personRepository = require("../repositories/PersonRepository");
const routineLineController = require("./RoutineLineController");

const model = "Routine";

// GET /api/routine/:id?_embed=activity
exports.list = async (req, res, next) => {
  const routineId = req.params.id * 1;
  const query = req.query;

  if (query._embed !== "activity") {
    next();
    return;
  }

  try {
    var routine = routineRepository.getById(routineId);

    var people = personRepository.find({});
    var list = [];

    people.forEach((person, index) => {
      list[index] = {
        person: person,
        activities: activityRepository.filter(
          { routineId: routineId, peopleId: person.id },
          "start"
        )
      };
    });

    res.status(200).json({ routine: routine, list: list });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: `Error to create a new ${model}`, error: e });
  }
};

exports.create = async (req, res) => {
  try {
    var newRoutine = req.body;
    var createLines = req.query.createLines === "true" ? true : false;

    var checkData = routineRepository.find({
      userId: newRoutine.userId,
      name: newRoutine.name
    });

    if (checkData !== undefined) {
      const status = 401;
      const message = `${model} exists`;
      res.status(status).json({ status, message });
      return;
    }

    newRoutine = routineRepository.insert(newRoutine);

    const lines = !createLines
      ? []
      : await routineLineController.create(newRoutine);

    res.status(200).json({ routine: newRoutine, lines: lines });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: `Error to create a new ${model}`, error: e });
  }
};

exports.createLines = async (req, res) => {
  try {
    const routineId = req.params.id;

    const routine = routineRepository.getById(routineId);
    const lines = await routineLineController.create(newRoutine);

    res.status(200).json({ routine: routine, lines: lines });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: `Error to create lines.`, error: e });
  }
};
