Page({
  setCanPullDown() {
    if (my.canIUse("setCanPullDown")) {
      my.setCanPullDown({
        canPullDown:true,
        complete: function(res) {
          my.alert({content: JSON.stringify(res)})
        }
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  },
});
