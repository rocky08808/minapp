Page({
  data: {},
  onLoad() {
    const app = getApp();
    this.setData({
      locale: app.globalData.locale,
    })
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  setTabBarBadge() {
    my.call("setTabBar", {
      actionType: "setTabBarBadge",
      index: 1,//测试页面为空时，是否异常
      text: "New",
      success: (res) => {
        my.alert({ content: "success" + JSON.stringify(res) })
},
      fail: (res) => {
        my.alert({ content: "fail" + JSON.stringify(res) })
        console.log(res)
      },
    }, function (res) { console.log(res) })
  },
  removeTabBarBadge() {
    my.call("setTabBar", {
      actionType: "removeTabBarBadge",
      index: 1,//测试页面为空时，是否异常
      success: (res) => {
        my.alert({ content: "success" + JSON.stringify(res) })
      },
      fail: (res) => {
        my.alert({ content: "fail" + JSON.stringify(res) })
        console.log(res)
      },
    }, function (res) { console.log(res) })
  },
  showTabBarRedDot() {
    my.call("setTabBar", {
      actionType: "showTabBarRedDot",
      index: 2,//测试页面为空时，是否异常
      success: (res) => {
        my.alert({ content: "success" + JSON.stringify(res) })
      },
      fail: (res) => {
        my.alert({ content: "fail" + JSON.stringify(res) })
        console.log(res)
      },
    }, function (res) { console.log(res) })
  },
  hideTabBarRedDot() {
    my.call("setTabBar", {
      actionType: "hideTabBarRedDot",
      index: 2,//测试页面为空时，是否异常
      success: (res) => {
        my.alert({ content: "success" + JSON.stringify(res) })
      },
      fail: (res) => {
        my.alert({ content: "fail" + JSON.stringify(res) })
        console.log(res)
      },
    }, function (res) { console.log(res) })
  },
  //待修复缺，参数为空时支付宝crash
  setTabBarStyle() {
    my.call("setTabBar", {
      actionType: "setTabBarStyle",
      color: '#FF0000',//测试参数为空时，是否异常#FF0000
      selectedColor: '#00FF00',//测试参数为空时，是否异常00FF00
      backgroundColor: '#0000FF',//测试参数为空时，是否异常0000FF
      borderStyle: 'white',//测试参数为空时，是否异常white
      success: (res) => {
        my.alert({ content: "success" + JSON.stringify(res) })
      },
      fail: (res) => {
        my.alert({ content: "fail" + JSON.stringify(res) })
        console.log(res)
      },
    }, function (res) { console.log(res) })
  },
  setTabBarItem() {
    my.call("setTabBar", {
      actionType: "setTabBarItem",
      index: 2,//测试参数为空时，是否异常
      text: 'test',//测试参数为空时，是否异常text
      iconPath: '/image/api.png',//测试参数为空时，是否异常/image/api.png
      selectedIconPath: '/image/biz_tag.png',//测试参数为空时，是否异常/image/biz_tag.png
      success: (res) => {
        my.alert({ content: "success" + JSON.stringify(res) })
      },
      fail: (res) => {
        my.alert({ content: "fail" + JSON.stringify(res) })
        console.log(res)
      },
    }, function (res) { console.log(res) })
  },
  showTabBar() {
    my.call("setTabBar", {
      actionType: "showTabBar",
      animation: true,
      success: (res) => {
        my.alert({ content: "success" + JSON.stringify(res) })
      },
      fail: (res) => {
        my.alert({ content: "fail" + JSON.stringify(res) })
        console.log(res)
      },
    }, function (res) { console.log(res) })
  },

  hideTabBar() {
    my.call("setTabBar", {
      actionType: "hideTabBar",
      animation:true,
      success: (res) => {
        my.alert({ content: "success" + JSON.stringify(res) })
      },
      fail: (res) => {
        my.alert({ content: "fail" + JSON.stringify(res) })
        console.log(res)
      },
    }, function (res) { console.log(res) })
  },
});
