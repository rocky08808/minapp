Page({
  data: {},
  onLoad() {},
  exitApp() {
    if (my.canIUse('exitApp')) {
      my.exitApp();
    } else {
      my.alert({ 
        title: 'JSAPI not available',
        content: 'my.exitApp() JSAPI is not available'
      });
    }
  }
});
