const personRepository = require("../repositories/PersonRepository");

const model = "Person";

// POST /api/person
exports.create = async (req, res) => {
  try {
    var newData = req.body;

    var checkData = personRepository.find({
      userId: newData.userId,
      name: newData.name
    });

    if (checkData !== undefined) {
      const status = 401;
      const message = `${model} exists`;
      res.status(status).json({ status, message });
      return;
    }

    newData = personRepository.insert(newData);

    res.status(200).json({ people: newData });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: `Error to create a new ${model}`, error: e });
  }
};
