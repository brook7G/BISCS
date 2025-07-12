const mongoose = require("mongoose");

const notificatonSchema = mongoose.Schema({
  StudentId: {
    type: String,
  },
  NotificationType: {
    type: String,
  },
  NotificationName: {
    type: String,
  },
  NotificationText: {
    type: String,
  },
  NotificationAction: {
    type: String,
  },
  Seen: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Notification", notificatonSchema);
