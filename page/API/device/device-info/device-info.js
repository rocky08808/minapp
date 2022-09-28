Page({
  getDeviceInfo() {
    if (my.canIUse("getDeviceInfo")) {
      my.getDeviceInfo({
        complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  getDeviceId() {
    if (my.canIUse('getDeviceID')) {
      my.getDeviceID({
        complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  },
});
