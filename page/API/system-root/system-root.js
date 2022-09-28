Page({
  getSystemRoot() {
    if (my.canIUse('isSystemRoot')) {
      my.isSystemRoot({
        success: function(res) {
          my.alert({ content: res })
        }
      })
    } else {
      my.alert({ title: "API not available", content: "my.isSystemRoot() is not available" })
    }

  },
});
