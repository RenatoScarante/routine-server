import ActivityRepository from "../repositories/ActivityRepository";

const repository = new ActivityRepository();
const model = "Activity";

function checkExists(newData) {
  var { id, routineId, peopleId, title, start } = newData;

  var checkData = repository.find(id !== id, {
    routineId: routineId,
    peopleId: peopleId,
    title: title
  });

  if (checkData === undefined) {
    checkData = repository.find(id !== id, {
      routineId: routineId,
      peopleId: peopleId,
      start: start
    });
  }

  if (checkData !== undefined) {
    return false;
  }

  return true;
}

// POST /api/activity
exports.create = async (req, res) => {
  try {
    var newData = req.body;

    newData = {
      ...newData,
      statusId: 1
    };

    if (!checkExists(newData)) {
      const status = 401;
      const message = `${model} exists`;
      res.status(status).json({ status, message });
      return;
    }

    newData = repository.insert(newData);

    res.status(200).json({ activity: newData });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: `Error to create a new ${model}`, error: e });
  }
};

// PUT /api/activity
exports.update = async (req, res) => {
  try {
    var updatedData = req.body;

    var activity = repository.getById(updatedData.id);

    if (activity === undefined) {
      const status = 401;
      const message = `${model} not exists`;
      res.status(status).json({ status, message });
      return;
    }

    if (
      activity.routineId !== updatedData.routineId ||
      activity.title !== updatedData.title ||
      activity.peopleId !== updatedData.peopleId ||
      activity.start !== updatedData.start
    ) {
      if (!checkExists(updatedData)) {
        const status = 401;
        const message = `${model} exists`;
        res.status(status).json({ status, message });
        return;
      }
    }

    repository.update(updatedData);

    res.status(200).json({ activity: updatedData });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: `Error to update a ${model}`, error: e });
  }
};
