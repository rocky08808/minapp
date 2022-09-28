let openAPIList = [
  {
    name: 'Obtain an authorization code',
    nameEn: 'getAuthCode',
    path: '/page/API/get-auth-code/get-auth-code',
  },
  {
    name: 'Initiate payment 1',
    nameEn: 'tradePay 1',
    // path: '/page/API/request-payment/request-payment',
    path: '/page/API/trade-pay/trade-pay',
  },
  {
    name: 'Initiate payment 2',
    nameEn: 'tradePay 2',
    path: '/page/API/request-payment/request-payment',
    // path: '/page/API/trade-pay/trade-pay',
  },
  {
    name: 'Get Open User Info',
    nameEn: 'getOpenUserInfo',
    path: '/page/API/open-user-info/open-user-info',
  },
  {
    name: 'Get user information',
    nameEn: 'getUserInfo',
    path: '/page/API/get-user-info/get-user-info',
  },
   {
    name: 'Push Notification',
    nameEn: 'pushNotifications',
    path: '/page/API/push-notification/push-notification',
  },
  // {
  //   name: '获取站点信息',
  //   nameEn: 'getSourceSite',
  //   path: '/page/API/get-Source-Site/get-Source-Site',
  // },
  {
    name: 'payment after void or capture',
    nameEn: 'voidCapture',
    path: '/page/API/void-capture/void-capture',
  },
];


let interfaceList = [
  {
    name: 'setBackgroundColor',
    nameEn: 'setBackgroundColor',
    path: '/page/API/setBackgroundColor/setBackgroundColor',
  },
  {
    name: 'Warning box',
    nameEn: 'Alert',
    path: '/page/API/alert/alert',
  },
  {
    name: 'promot',
    nameEn: 'Promot',
    path: '/page/API/promot/promot',
  },
  {
    name: 'Confirmation box',
    nameEn: 'Confirm',
    path: '/page/API/confirm/confirm',
  },
  {
    name: 'toast',
    nameEn: 'Toast',
    path: '/page/API/toast/toast',
  },
  {
    name: 'Loading hint',
    nameEn: 'Loading',
    path: '/page/API/loading/loading',
  },
  {
    name: 'The operating menu',
    nameEn: 'ActionSheet',
    path: '/page/API/action-sheet/action-sheet',
  },
  {
    name: 'NavigationBar',
    nameEn: 'NavigationBar',
    path: '/page/API/ui/navigation-bar/navigation-bar'
  },
  {
    name: 'SetNavigationBar',
    nameEn: 'SetNavigationBar',
    path: '/page/API/set-navigation-bar/set-navigation-bar',
  },
  {
    name: 'setoptionMenu',
    nameEn: 'setOptionMenu',
    path: '/page/API/option-menu/option-menu',
  },
  {
    name: 'Page jump',
    nameEn: 'Navigator',
    path: '/page/API/navigator/navigator',
  },
  {
    name: 'Pull down to refresh',
    nameEn: 'pullDownRefresh',
    path: '/page/API/pull-down-refresh/pull-down-refresh'
  },
  {
    name: 'SetCanPullDown',
    nameEn: 'SetCanPullDown',
    path: '/page/API/ui/set-can-pull/set-can-pull'
  },
  {
    name: 'Animation',
    nameEn: 'Animation',
    path: '/page/API/animation/animation',
  },
  {
    name: 'Canvas',
    nameEn: 'Canvas',
    path: '/page/API/canvas/canvas',
  },
  {
    name: 'DatePicker',
    nameEn: 'DatePicker',
    path: '/page/API/date-picker/date-picker',
  },
  {
    name: 'PageScrollTo',
    nameEn: 'PageScrollTo',
    path: '/page/API/page-scroll-to/page-scroll-to',
  },
  {
    name: '节点查询',
    nameEn: 'createSelectorQuery',
    path: '/page/API/create-selector-query/create-selector-query',
  },
  {
    name: 'TabBar',
    nameEn: 'TabBar',
    path: '/page/setTabBar/setTabBar'
  },
  {
    name: 'hideBackHome',
    nameEn: 'hideBackHome',
    path: '/page/API/hide-back-home/hide-back-home'
  },
  {
    name: 'Contact',
    nameEn: 'Contact',
    path: '/page/API/contact/contact',
  },
  {
    name: 'navigationBarLoading',
    nameEn: 'navigationBarLoading',
    path: '/page/API/navigation-bar-loading/navigation-bar-loading',
  },
  {
    name: 'ChooseCity',
    nameEn: 'ChooseCity',
    path: '/page/API/choose-city/choose-city',
  },
  {
    name: 'hide keyboard',
    nameEn: 'keyboard',
    path: '/page/API/keyboard/keyboard',
  },
  {
    name: 'MultiLevelSelect',
    nameEn: 'MultiLevelSelect',
    path: '/page/API/multi-level-select/multi-level-select',
  },
  {
    name: 'optionsSelect',
    nameEn: 'optionsSelect',
    path: '/page/API/options-select/options-select',
  },
  {
    name: 'GetTitleColor',
    nameEn: 'GetTitleColor',
    path: '/page/API/get-title-color/get-title-color',
  }
];


let deviceAPIList = [
  {
    name: 'GetNetworkType',
    nameEn: 'GetNetworkType',
    path: '/page/API/get-network-type/get-network-type',
  },
  {
    name: 'NetworkStatusChange',
    nameEn: 'NetworkStatusChange',
    path: '/page/API/device/network-change/network-change'
  },
  {
    name: 'canIUse',
    nameEn: 'CanIUse',
    path: '/page/API/canIUse/canIUse',
  },
  {
    name: 'GetSystemInfo',
    nameEn: 'GetSystemInfo',
    path: '/page/API/get-system-info/get-system-info',
  },
  {
    name: '振动',
    nameEn: 'Vibrate',
    path: '/page/API/vibrate/vibrate',
  },
  {
    name: 'Clipboard',
    nameEn: 'Clipboard',
    path: '/page/API/clipboard/clipboard',
  },
];


deviceAPIList = deviceAPIList.concat([
  {
    name: 'IsSystemRoot',
    nameEn: 'IsSystemRoot',
    path: '/page/API/system-root/system-root',
  },
  {
    name: 'GetOpenUserData',
    nameEn: 'GetOpenUserData',
    path: '/page/API/device/open-user/open-user'
  },
  {
    name: 'DeviceInfo',
    nameEn: 'DeviceInfo',
    path: '/page/API/device/device-info/device-info'
  },
  {
    name: 'CarrierName',
    nameEn: 'CarrierName',
    path: '/page/API/device/carrier-name/carrier-name'
  },
  {
    name: 'User settings',
    nameEn: 'User settings',
    path: '/page/API/device/user-setting/user-setting'
  },
  {
    name: 'User auth guide',
    nameEn: 'User auth guide',
    path: '/page/API/device/user-auth-guide/user-auth-guide'
  },
  {
    name: 'SDKVersion',
    nameEn: 'SDKVersion',
    path: '/page/API/sdk-version/sdk-version',
  },
  {
    name: 'Screen',
    nameEn: 'Screen',
    path: '/page/API/screen/screen',
  },
  {
    name: 'WatchShake',
    nameEn: 'WatchShake',
    path: '/page/API/watch-shake/watch-shake',
  },
  {
    name: 'MakePhoneCall',
    nameEn: 'MakePhoneCall',
    path: '/page/API/make-phone-call/make-phone-call',
  },
  {
    name: 'UserCaptureScreen',
    nameEn: 'UserCaptureScreen',
    path: '/page/API/user-capture-screen/user-capture-screen',
  },
  {
    name: 'GetServerTime',
    nameEn: 'GetServerTime',
    path: '/page/API/get-server-time/get-server-time',
  },
  {
    name: 'Battery info',
    nameEn: 'Battery info',
    path: '/page/API/device/battery/battery'
  },
  {
    name: 'Power warning',
    nameEn: 'Power warning',
    path: '/page/API/device/power-warning/power-warning'
  },
  {
    name: 'MemoryWarning',
    nameEn: 'MemoryWarning',
    path: '/page/API/memory-warning/memory-warning',
  },
  // {
  //   name: 'Device motion event',
  //   nameEn: 'Device motion event',
  //   path: '/page/API/device/device-motion/device-motion'
  // },
  // {
  //   name: 'Gyroscope',
  //   nameEn: 'Gyroscope',
  //   path: '/page/API/device/gyroscope/gyroscope'
  // },
  // {
  //   name: 'Accelerometer',
  //   nameEn: 'Accelerometer',
  //   path: '/page/API/device/accelerometer/accelerometer'
  // },
  // {
  //   name: 'Campass',
  //   nameEn: 'Campass',
  //   path: '/page/API/device/compass/compass'
  // },
  {
    name: 'WIFI',
    nameEn: 'WIFI',
    path: '/page/API/device/wifi/wifi'
  },
  // {
  //   name: 'NFC',
  //   nameEn: 'NFC',
  //   path: '/page/API/device/nfc/nfc'
  // },
  {
    name: 'Bluetooth',
    nameEn: 'Bluetooth',
    path: '/page/API/bluetooth/bluetooth',
  },
  {
    name: 'GetUpdateManager',
    nameEn: 'GetUpdateManager',
    path: '/page/API/get-update-manager/get-update-manager',
  },
]);


const networkAPIList = [
  {
    name: 'Initiate an HTTP request',
    nameEn: 'Request',
    path: '/page/API/request/request',
  },
  {
    name: 'Websocket',
    nameEn: 'Websocket',
    path: '/page/API/websocket/websocket',
  }
];

const fileAPIList = [
  {
    name: 'UploadFile',
    nameEn: 'UploadFile',
    path: '/page/API/upload-file/upload-file',
  },
  {
    name: 'downloadFile',
    nameEn: 'downloadFile',
    path: '/page/API/download-file/download-file',
  },
  {
    name: 'File',
    nameEn: 'File',
    path: '/page/API/file/file',
  },
  {
    name: 'OpenDocument',
    nameEn: 'OpenDocument',
    path: '/page/API/open-document/open-document'
  }
];

const mediaAPIList = [
  {
    name: 'image',
    nameEn: 'image',
    path: '/page/API/image/image',
  },
  {
    name: 'GetImageInfo',
    nameEn: 'GetImageInfo',
    path: '/page/API/get-image-info/get-image-info',
  },
  {
    name: 'CompressImage',
    nameEn: 'CompressImage',
    path: '/page/API/compress-image/compress-image',
  },
];

const locationAPIList = [
  {
    name: 'GetLocation',
    nameEn: 'GetLocation',
    path: '/page/API/get-location/get-location',
  },
  {
    name: 'openLocation',
    nameEn: 'openLocation',
    path: '/page/API/open-location/open-location',
  },
  {
    name: 'chooseLocation',
    nameEn: 'chooseLocation',
    path: '/page/API/choose-location/choose-location',
  },
];

let otherAPIList = [
  {
    name: 'storage',
    nameEn: 'storage',
    path: '/page/API/storage/storage',
  },
  {
    name: 'scanCode',
    nameEn: 'scanCode',
    path: '/page/API/scan-code/scan-code',
  },
  {
    name: 'share',
    nameEn: 'share',
    path: '/page/API/share/share',
  },
  {
    name: 'call',
    nameEn: 'call',
    path: '/page/API/call/call',
  },
  {
    name: 'exitApp',
    nameEn: 'exitApp',
    path: '/page/API/exitApp/exitApp',
  },
  {
    name: 'getAppIdSync',
    nameEn: 'getAppIdSync',
    path: '/page/API/getAppIdSync/getAppIdSync',
  },
];


otherAPIList = otherAPIList.concat([
  {
    name: 'RSA',
    nameEn: 'RSA',
    path: '/page/API/rsa/rsa',
  },
  {
    name: 'ReportAnalytics',
    nameEn: 'ReportAnalytics',
    path: '/page/API/report-analytics/report-analytics',
  },
  {
    name: 'Crypto',
    nameEn: 'Crypto',
    path: '/page/API/crypto/crypto',
  }
]);

if (my.canIUse('on')) {
  otherAPIList = otherAPIList.concat([
    {
      name: 'Events',
      nameEn: 'Events',
      path: '/page/API/events/events',
    },
  ]);
}

if (my.canIUse('ocr')) {
  otherAPIList = otherAPIList.concat([
    {
      name: 'OCR',
      nameEn: 'OCR',
      path: '/page/API/ocr/ocr',
    },
  ]);
}


const APIList = [
  {
    type: 'OpenAPI',
    typeEn: 'OpenAPI',
    list: openAPIList,
  },
  {
    type: 'Interface',
    typeEn: 'Interface',
    list: interfaceList,
  },
  {
    type: 'Device',
    typeEn: 'DeviceAPI',
    list: deviceAPIList,
  },
  {
    type: 'NetworkAPI',
    typeEn: 'NetworkAPI',
    list: networkAPIList,
  },
  {
    type: 'FileAPI',
    typeEn: 'FileAPI',
    list: fileAPIList,
  },
  {
    type: 'MediaAPI',
    typeEn: 'MediaAPI',
    list: mediaAPIList,
  },
  {
    type: 'Location',
    typeEn: 'LocationAPI',
    list: locationAPIList,
  },
  {
    type: 'Other',
    typeEn: 'OtherAPI',
    list: otherAPIList,
  }
];

Page({
  data: {
    APIList,
  },

  onSearchBarTap() {
    my.navigateTo({
      url: '/page/common/search/search',
    });
  },
  onLoad() {
    const app = getApp();
    this.setData({
      locale: app.globalData.locale,
    })
    my.getSystemInfo({
      success: (res) => {
        if (res.statusBarHeight && res.titleBarHeight) {
          this.setData({
            top: res.statusBarHeight + res.titleBarHeight,
          });
        }
      },
    });
  },
  onlaunch(options) {
    my.alert({
      title: 'app onLaunch',
      content: JSON.stringify(options),
      success: (res) => {
        //成功处理代码段
      },
    });

    //获取关联普通二维码的码值，放到全局变量qrCode中
    if (options.query && options.query.qrCode) {
      this.qrCode = options.query.qrCode;
    }
  }
});
