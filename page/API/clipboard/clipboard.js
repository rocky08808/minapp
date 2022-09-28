Page({
  data: {
    text: '3.1415926',
    copy: '',
  },

  handleInput(e) {
    this.setData({
      text: e.detail.value,
    });
  },

  handleCopy() {
    my.setClipboard({
      text: this.data.text,
      success: res => {
        my.alert({ title: 'success: ' + JSON.stringify(res) });
      },
      fail: function (res) {
        my.alert({ title: 'failed: ' + JSON.stringify(res) });
      },
      complete: res => {
        my.showToast({
          content: 'complete：' + JSON.stringify(res)
        });
      },
    });
  },

  handlePaste() {
    my.getClipboard({
      success: ({ text }) => {
        this.setData({ copy: text });
         my.alert({ title: 'success: ' + text });
      },
      fail: function (res) {
        my.alert({ title: 'failed: ' + JSON.stringify(res) });
      },
      complete: res => {
        my.showToast({
          content: 'complete：' + JSON.stringify(res)
        });
      },
    });
  },
});
