Page({
  data: {
    condition: false,
  },
  onReady() {
    my.onUserCaptureScreen(() => {
      my.alert({
        content: 'Receive user screenshot',
      });
    });
  },
  offUserCaptureScreen() {
    my.offUserCaptureScreen();
    this.setData({
      condition: false,
    });
  },
  onUserCaptureScreen() {
    my.onUserCaptureScreen(() => {
      my.alert({
        content: 'Receive user screenshot'
      });
    });
    this.setData({
      condition: true,
    });
  },
});
