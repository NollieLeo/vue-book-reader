import { Notification } from "electron";

let notification;

function showNotification(options) {
  notification = new Notification(options).show();
}

export { showNotification, notification };
