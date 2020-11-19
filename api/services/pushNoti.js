var admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
let apps = {};
let doPush = async (app, message) => {
  return app.messaging().send(message);
};
module.exports = {
  initApp: async () => {
    let files = fs.readdirSync(path.join(__dirname, "../../config_firebase"));
    files.map((file) => {
      let bundle = path.basename(file, ".json");
      apps[bundle] = admin.initializeApp(
        {
          credential: admin.credential.cert(
            require(`../../config_firebase/${file}`)
          ),
        },
        bundle
      );
    });
  },
  pushNotifyTopicAll: async (title, body, image) => {
    let app = "";
    let message = {
      topic: "all",
      notification: {
        title,
        body,
      },
    };
    message.android = {
      notification: {
        icon: "ic_stat_ic_notif.png",
        color: "#E76E26",
        sound: "default",
      },
    };
    message.apns = {
      payload: {
        aps: {
          badge: 0,
          sound: "default",
        },
      },
    };
    if (image) {
      message.android.notification.image = image;
      message.apns.fcm_options = {
        image,
      };
    }
    await doPush(apps[app], message);
  },
  pushNotificationToCustomer: async (notification) => {
    let device = await Device.findOne({
      where: { customerId: notification.customerId },
      select: ["fcmToken", "id", "bundleId", "systemName"],
    });
    if (notification.data) {
      notification.data = JSON.parse(notification.data);
    } else {
      notification.data = {};
    }
    if (notification.image) {
      notification.data.image = notification.image || "";
    }
    if (!notification.data.action) {
      notification.data.action = "message";
    }
    if (!notification.data.image) {
      delete notification.data.image;
    }
    var message = {
      data: notification.data,
      // data: { action: 'message', data: 'hahahaa' },
      notification: {
        title: notification.title,
        body: notification.body,
      },
      token: device.fcmToken,
    };
    if (device.systemName === "android") {
      message.android = {
        notification: {
          icon: "ic_stat_ic_notif.png",
          color: "#E76E26",
          sound: "default",
        },
      };
      if (notification.image) {
        message.android.notification.image = notification.image;
      }
    } else {
      message.apns = {
        payload: {
          aps: {
            badge: 0,
            sound: "default",
          },
        },
      };
      if (notification.image) {
        message.apns.fcm_options = {
          image: notification.image,
        };
      }
    }
    try {
      try {
        if (notification.app) {
          await doPush(apps[notification.app], message);
        } else {
          if (!apps[device.bundleId]) {
            throw { message: `cannot find app bundle ${device.bundleId}` };
          }
          await doPush(apps[device.bundleId], message);
        }
      } catch (err) {}
    } catch (err) {
      console.log(err);
    }
  },
};
