var user = require("./user.json");
var routine = require("./routine.json");
var routineLine = require("./routineLine.json");
var activity = require("./activity.json");
var frequency = require("./frequency.json");
var person = require("./person.json");
var history = require("./activityHistory.json");

module.exports = function() {
  return {
    user: user,
    routine: routine,
    routineLine: routineLine,
    activity: activity,
    frequency: frequency,
    person: person,
    history: history
  };
};
