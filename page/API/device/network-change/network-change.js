Page({
  onNetworkStatusChange() {
    if (my.canIUse("onNetworkStatusChange")) {
      my.onNetworkStatusChange(function(res) {
        my.alert({ content: JSON.stringify(res) })
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  offNetworkStatusChange() {
    if (my.canIUse('offNetworkStatusChange')) {
      my.offNetworkStatusChange()
    } else {
      my.alert({ content: "API is not available" })
    }
  },
});
