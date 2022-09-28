Page({
  data: {},
  onLoad() { },
  callGetSystemInfo() {
    if (my.canIUse('call')) {
      my.call('getSystemInfo', {}, (res) => {
        my.alert({
          content: 'system info: ' + JSON.stringify(res)
        })
      })
    } else {
      my.alert({
        title: 'JSAPI not available',
        content: 'my.call() JSAPI is not available'
      });
    }
  },
  callShowAlert() {
    if (my.canIUse('call')) {
      my.call('alert', {
        title: 'success',
        content: 'Toast content'
      })
    } else {
      my.alert({
        title: 'JSAPI not available',
        content: 'my.call() JSAPI is not available'
      });
    }
  }
});
