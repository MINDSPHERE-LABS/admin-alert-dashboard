const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:admin@yourapp.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

function sendPush(subscription, payload) {
  return webpush.sendNotification(
    subscription,
    JSON.stringify(payload)
  );
}

module.exports = { sendPush };
