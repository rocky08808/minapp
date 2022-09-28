Page({
  getTitleColor() {
    if (my.canIUse("getTitleColor")) {
      my.getTitleColor({
        complete: function(res) {
          my.alert({content:JSON.stringify(res) })
        }
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  hideBackHome() {
    if (my.canIUse('hideBackHome')) {
      my.reLaunch({
        url: '/page/API/ui/navigation-bar/navigation-bar', // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
        success: (res) => {
          setTimeout(() => {
            //5秒后隐藏返回首页按钮
            my.hideBackHome()
          }, 5000)
        },
        fail:()=>{
          my.showToast({
            content: 'fail', 
          });
        }
      });
    } else {
      my.alert({ content: "API is not available" })
    }
  },
});
