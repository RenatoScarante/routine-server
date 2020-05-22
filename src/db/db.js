var user = require("./user.json");
var routine = require("./routine.json");
var activity = require("./activity.json");
var frequency = require("./frequency.json");
var history = require("./activityHistory.json");

module.exports = function() {
  return {
    user: user,
    routine: routine,
    activity: activity,
    frequency: frequency,
    history: history
  };
};
