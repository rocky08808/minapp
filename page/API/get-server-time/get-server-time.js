Page({

  getServerTime() {
    if (my.canIUse('call')) {
      my.getServerTime({
        success: (res) => {
          my.alert({
            content: res.time,
          });
        },
        fail: function (res) {
          my.alert({ title: 'fail' });
        },
        complete: (res) => {
          my.alert({ title: 'complete' });
        },
      });
    } else {
      my.alert({
        title: 'JSAPI not available',
        content: 'my.call() JSAPI is not available'
      });
    }
  }
})
