Page({
  data: {
    hasNetworkType: false
  },
  onLoad() {
    this.onChange = this.onChange.bind(this);
    // my.onNetworkChange(this.onChange);
  },
  onChange(res) {
    console.log('onNetworkChange', res);
    this.setData({
      hasNetworkType: true,
      networkType: res.networkType
    });
  },
  onUnload() {
    // my.offNetworkChange(this.onChange);
  },
  getNetworkType() {
    my.getNetworkType({
      success: (res) => {
        this.setData({
          hasNetworkType: true,
          networkType: res.networkType
        })
        my.alert({
          content: 'getNetworkType success: ' + JSON.stringify(res),
        });
      }
    })
  },
  clear() {
    this.setData({
      hasNetworkType: false,
      networkType: ''
    })
  },
});
