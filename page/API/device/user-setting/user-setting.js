Page({
  getSetting() {
    if (my.canIUse("getSetting")) {
      my.getSetting({
        complete: function(res) {
          my.alert({
            content: JSON.stringify(res),
          });
        }
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  openSetting() {
    if (my.canIUse("openSetting")) {
      my.openSetting({
        complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      })
    } else {
      my.alert({
        content: "API is not available",
      });
    }

  }
});
