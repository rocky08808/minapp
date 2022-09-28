Page({
  data: {
    showRectangle: true,
    showDialog: true,
    content: 'OKOKOKOKO',
    time: 5000,
  },
  onCloseTap() {
    this.setData({
      showRectangle: false,
    });
  },
  onRectangleTap() {
    my.alert({
      content: 'do something',
    });
  },
  onDialogTap() {
    this.setData({
      showDialog: false,
    });
  },
   onClose() {
    my.alert({
      title: '12321'
    });
  }
});
