Page({
  getOpenUserData() {
    if (my.canIUse('getOpenUserData')) {
      my.getOpenUserData({
        complete: function(res) {
          my.alert({
            content: JSON.stringify(res)
          });
        }
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  },
});
