Page({
  data: {},
  onLoad() {},
  getAppIdSync() {
    if (my.canIUse('getAppIdSync')) {
      const appIdRes = my.getAppIdSync();
      my.showToast({content: 'App ID: ' + JSON.stringify(appIdRes)});
    } else {
      my.alert({ 
        title: 'JSAPI not available',
        content: 'my.getAppIdSync() JSAPI is not available'
      });
    }
  }
});
