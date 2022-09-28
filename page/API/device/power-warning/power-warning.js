Page({
  onLoad() {
    this.callback = (res) => {
      var levelString = 'iOS warinig without level.';
      switch (res.level) {
        case 10:
          levelString = 'Android warning, level = TRIM_MEMORY_RUNNING_LOW';
          break;
        case 15:
          levelString = 'Android warning, level = TRIM_MEMORY_RUNNING_CRITICAL';
          break;
      }
      my.alert({
        title: 'Low power warning',
        content: levelString
      });
    };
    this.isApiAvailable = my.canIUse('onLowPowerWarning');
  },
  onLowPowerWarning() {
    if (this.isApiAvailable) {
      my.onLowPowerWarning(this.callback);
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.onLowPowerWarning() is not available'
      });
    }
  },
  offLowPowerWarning() {
    if (my.canIUse('offLowPowerWarning')) {
      my.offLowPowerWarning(this.callback);
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.onLowPowerWarning() is not available'
      });
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
        title: 'API not available',
        content: 'my.isLowPowerMode() is not available'
      });
    }

  },
  onUnload() {
    if (this.isApiAvailable) {
      my.offLowPowerWarning(this.callback);
    }
  }
});
