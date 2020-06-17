import BaseService from "./BaseService";
import RoutineLineRepository from "../repositories/RoutineLineRepository";

class RoutineLineService extends BaseService {
  constructor() {
    super(new RoutineLineRepository());
  }

  addIntervalToTime = (time, interval) => {
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
  };

  createLines = routine => {
    return new Promise((resolve, reject) => {
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

        this._repository.insert(newLine);

        while (newTime !== endTime) {
          newTime = this.addIntervalToTime(lastTime, interval);

          newLine = {
            routineId: routine.id,
            time: newTime,
            title: newTime
          };

          newLine = this._repository.insert(newLine);

          lastTime = newTime;

          lines.push(newLine);
        }

        resolve(lines);
      } catch (error) {
        reject(
          `Error to create lines from routine id ${routine.id}, ${error.message}.`
        );
      }
    });
  };

  deleteLines = routineId => {
    return new Promise((resolve, reject) => {
      this._repository.delete({ routineId: routineId });

      resolve();
    });
  };
}

export default RoutineLineService;
