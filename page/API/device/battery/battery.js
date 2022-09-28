Page({
  onLoad() {
    this.callback = (res) => {
      console.log(res);
    };
  },
  getBatteryInof() {
    if (my.canIUse("getBatteryInfo")) {
      my.getBatteryInfo({
        success: (res) => {
          my.alert({ content: 'Battery info: ' + JSON.stringify(res), });
          console.log({ content: 'Battery info:' + JSON.stringify(res), });
        },
        fail: (error) => {
          my.alert({ content: 'failed: ' + JSON.stringify(error), });
        },
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  getBatteryInfoSync() {
    if (my.canIUse('getBatteryInfoSync')) {
      var res = my.getBatteryInfoSync();
      my.alert({ content: 'Baterry info: ' + JSON.stringify(res) });
      console.log({ content: 'Battery info: ' + JSON.stringify(res) });
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  isLowPowerMode() {
    if (my.canIUse('isLowPowerMode')) {
      my.isLowPowerMode({
        complete: function(res) {
          my.alert({
            content: JSON.stringify(res)
          });
        }
      })
    } else {
      my.alert({
        content: 'API is not available'
      });
    }
  },
  onLowPowerWarning() {
    if (my.canIUse('onLowPowerWarning')) {
      my.onLowPowerWarning(this.callback)
    } else {
      my.alert({
        content: 'API is not available'
      });
    }
  },
  offLowPowerWarning() {
    if (my.canIUse('offLowPowerWarning')) {
      my.offLowPowerWarning(this.callback)
    } else {
      my.alert({
        content: 'API is not available'
      });
    }
  }
});
