Page({
  vibrate() {
    my.vibrate({
      success: () => {
        my.alert({ title: 'Vibrate'});
      }
    });
  },
  vibrateLong() {
    if (my.canIUse('vibrateLong')) {
      my.vibrateLong((res) => { });
    } else {
      my.alert({
        title: 'Client version is too low',
        content: 'my.vibrateLong() Requires version 10.1.35 and above'
      });
    }
  },
  vibrateShort() {
    if (my.canIUse('vibrateShort')) {
      my.vibrateShort((res) => { });
    } else {
      my.alert({
        title: 'Client version is too low',
        content: 'my.vibrateShort() Requires version 10.1.35 and above'
      });
    }
  }
});
