Page({
  getCarrierName() {
    if (my.canIUse('getCarrierName')) {
      my.getCarrierName({
        complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      })
    } else {
      my.alert({
        title: 'API not Available',
        content: 'my.getCarrierName() is not available'
      })
    }

  },
});
