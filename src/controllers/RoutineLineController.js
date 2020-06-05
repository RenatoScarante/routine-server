const routineLineRepository = require("../repositories/RoutineLineRepository");

const model = "RoutineLine";

function addIntervalToTime(time, interval) {
  var oldTime = time.split(":");
  var intervalTime = interval.split(":");

  var timeHour = oldTime[0] * 1;
  var timeMinute = oldTime[1] * 1;

  var intervalHour = intervalTime[0] * 1;
  var intervalMinute = intervalTime[1] * 1;

  var newHour = timeHour + intervalHour;
  var newMinute = 0;

  if (timeMinute + intervalMinute === 60) {
    newHour++;
  } else if (timeMinute + intervalMinute < 60) {
    newMinute = timeMinute + intervalMinute;
  } else {
    newHour++;
    newMinute = timeMinute + intervalMinute - 60;
  }

  var newTime = `${newHour
    .toString()
    .padStart(2, "0")}:${newMinute.toString().padStart(2, "0")}`;

  return newTime;
}

exports.create = async routine => {
  try {
    const startTime = routine.start;
    const endTime = routine.end;
    const interval = routine.interval;
    var lines = [];

    var newTime;
    var lastTime = startTime;

    var newLine = {
      routineId: routine.id,
      time: startTime,
      title: startTime
    };

    routineLineRepository.insert(newLine);

    while (newTime !== endTime) {
      newTime = addIntervalToTime(lastTime, interval);

      newLine = {
        routineId: routine.id,
        time: newTime,
        title: newTime
      };

      newLine = routineLineRepository.insert(newLine);

      lastTime = newTime;

      lines.push(newLine);
    }

    return lines;
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: `Error to create a new ${model}`, error: e });
  }
};
