import lifecycle from '/util/lifecycle';

Page({
  ...lifecycle,
  data: {
    pageName: 'stability/stability',
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    arr: {
      onItemTap: 'onGridItemTap',
      list: [{
        icon: '/image/icon_component.png',
        title: 'Bluetooth',
        entitle: 'Collapse',
        page: '/page/stability/pages/bluetooth/bluetooth'
      },{
        icon: '/image/icon_component.png',
        title: 'Get cached data',
        entitle: 'getStorage',
        page: '/page/stability/pages/getStorage/getStorage'
      },{
        icon: '/image/icon_component.png',
        title: 'Synchronously get cached data',
        entitle: 'getStorageSync',
        page: '/page/stability/pages/getStorageSync/getStorageSync'
      }, {
        icon: '/image/icon_component.png',
        title: 'getLocation',
        entitle: 'getLocation',
        page: '/page/stability/pages/getLocation/getLocation'
      },{
        icon: '/image/icon_component.png',
        title: 'Get system information',
        entitle: 'getSystemInfo',
        page: '/page/stability/pages/getSystemInfo/getSystemInfo'
      }, {
        icon: '/image/icon_component.png',
        title: 'http request',
        entitle: 'httpRequest',
        page: '/page/stability/pages/httpRequest/httpRequest'
      }, {
        icon: '/image/icon_component.png',
        title: 'navigateTo',
        entitle: 'navigateTo',
        page: '/page/stability/pages/navigateTo/navigateTo'
      }, {
        icon: '/image/icon_component.png',
        title: 'redirectTo',
        entitle: 'redirectTo',
        page: '/page/stability/pages/redirectTo/redirectTo'
      }, {
        icon: '/image/icon_component.png',
        title: 'showLoading',
        entitle: 'redirectTo',
        page: '/page/stability/pages/showLoading/showLoading'
      }, {
        icon: '/image/icon_component.png',
        title: 'weak hint',
        entitle: 'redirectTo',
        page: '/page/stability/pages/showToast/showToast'
      }, {
        icon: '/image/icon_component.png',
        title: 'Save cached data',
        entitle: 'setStorage',
        page: '/page/stability/pages/setStorage/setStorage'
      }, {
        icon: '/image/icon_component.png',
        title: 'User authorization',
        entitle: 'getAuthCode',
        page: '/page/stability/pages/getAuthCode/getAuthCode',
      }, {
        icon: '/image/icon_component.png',
        title: 'send data',
        entitle: 'sendSocketMessage',
        page: '/page/stability/pages/sendSocketMessage/sendSocketMessage'
      }, {
        icon: '/image/icon_component.png',
        title: 'Delete cached data',
        entitle: 'removeStorage',
        page: '/page/stability/pages/removeStorage/removeStorage',
      }, {
        icon: '/image/icon_component.png',
        title: 'Return to the superior',
        entitle: 'navigateBack',
        page: '/page/stability/pages/navigateBack/navigateBack',
      }, {
        icon: '/image/icon_component.png',
        title: 'Scan code',
        entitle: 'scan',
        page: '/page/stability/pages/scan/scan',
      }, {
        icon: '/image/icon_component.png',
        title: alert',
        entitle: 'alert',
        page: '/page/stability/pages/alert/alert',
      }, {
        icon: '/image/icon_component.png',
        title: 'confirm',
        entitle: 'confirm',
        page: '/page/stability/pages/confirm/confirm',
      }, {
        icon: '/image/icon_component.png',
        title: 'Set the navigation bar',
        entitle: 'setNavigationBar',
        page: '/page/stability/pages/setNavigationBar/setNavigationBar'
      }],
    },
  },
  onGridItemTap(e) {
    const page = this.data.arr.list[e.target.dataset.index].page;
    my.navigateTo({ url: page })
  },
});
