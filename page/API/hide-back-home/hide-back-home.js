Page({
  data: {},
  onLoad() {
  //   my.reLaunch({
  //   url:'/page/API/confirm/confirm'// 在页面中添加的非首页
  // })
  
  // setTimeout(() => {
  //   //5秒后隐藏返回首页按钮
  //   my.hideBackHome()
  // }, 10000)
  },
  onReady() {
    if (my.canIUse('hideBackHome')) {
      my.hideBackHome();
    }
  },

});
