Page({
  startZMVerify() {
    if (!my.canIUse('startZMVerify')) {
      my.alert({
        title: 'Client version is too low',
        content: 'Please upgrade'
      });
      return;
    }

    my.startZMVerify({
      bizNo: 'demo',
      success: (res) => {
        my.alert({ title: 'success:' + JSON.stringify(res)});
      },
      fail: (res) => {
        my.alert({ title: 'fail: ' + JSON.stringify(res)});
      },
    });
  }
})

