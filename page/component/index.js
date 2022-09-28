const basicContainers = [
  {
    name: 'view',
    thumb: '/image/icon/view.png',
    nameEn: 'View',
    path: '/page/component/view/view',
  },
  {
    name: 'Scroll view',
    thumb: '/image/icon/scroll-view.png',
    nameEn: 'ScrollView',
    path: '/page/component/scroll-view/scroll-view',
  },
  {
    name: 'Sliding view',
    thumb: '/image/icon/swiper.png',
    nameEn: 'Swiper',
    path: '/page/component/swiper/swiper',
  },
  {
    name: 'movable-view',
    thumb: '/image/icon/view.png',
    nameEn: 'movable-view',
    path: '/page/component/movable-view/movable-view',
  },
  {
    name: 'cover-view',
    thumb: '/image/icon/view.png',
    nameEn: 'cover-view',
    path: '/page/component/cover-view/cover-view',
  },
];

const basicBasics = [
  {
    name: 'Text',
    thumb: '/image/icon/text.png',
    nameEn: 'Text',
    path: '/page/component/text/text',
  },
  {
    name: 'icon',
    thumb: '/image/icon/icon.png',
    nameEn: 'Icon',
    path: '/page/component/icon/icon',
  },
  {
    name: 'rich-text',
    thumb: '/image/icon/text.png',
    nameEn: 'rich-text',
    path: '/page/component/rich-text/rich-text',
  },
];

const basicFeedBacks = [
  {
    name: 'progress bar',
    thumb: '/image/icon/progress.png',
    nameEn: 'Progress',
    path: '/page/component/progress/progress',
  },
];

const basicForms = [
  {
    name: 'Button',
    thumb: '/image/icon/button.png',
    nameEn: 'Button',
    path: '/page/component/button/button',
  },
  {
    name: 'Form entry',
    thumb: '/image/icon/form.png',
    nameEn: 'FormToClick',
    path: '/page/component/form/form',
  },
  {
    name: 'label',
    thumb: '/image/icon/label.png',
    nameEn: 'Label',
    path: '/page/component/label/label',
  },
  {
    name: 'Input box',
    thumb: '/image/icon/input.png',
    nameEn: 'Input',
    path: '/page/component/input/input',
  },
  {
    name: 'Multi-line input box',
    thumb: '/image/icon/textarea.png',
    nameEn: 'Textarea',
    path: '/page/component/textarea/textarea',
  },
  {
    name: 'Radio buttons',
    thumb: '/image/icon/radio.png',
    nameEn: 'Radio',
    path: '/page/component/radio/radio',
  },
  {
    name: 'Checkbox',
    thumb: '/image/icon/checkbox.png',
    nameEn: 'Checkbox',
    path: '/page/component/checkbox/checkbox',
  },
  {
    name: 'switch',
    thumb: '/image/icon/switch.png',
    nameEn: 'Switch',
    path: '/page/component/switch/switch',
  },
  {
    name: 'Slider',
    thumb: '/image/icon/slider.png',
    nameEn: 'Slider',
    path: '/page/component/slider/slider',
  },
  {
    name: 'Selector view',
    thumb: '/image/icon/picker-view.png',
    nameEn: 'PickerView',
    path: '/page/component/picker-view/picker-view',
  },
  {
    name: 'Selector',
    thumb: '/image/icon/picker.png',
    nameEn: 'Picker',
    path: '/page/component/picker/picker',
  },
];

const basicNavigators = [
  {
    name: 'Navigation entrance',
    thumb: '/image/icon/navigator.png',
    nameEn: 'NavigatorToClick',
    path: '/page/component/navigator/navigator',
  },
  {
    name: 'Embedded webview',
    thumb: '/image/icon/webview.png',
    nameEn: 'Webview',
    path: '/page/component/webview/webview',
  },
  {
    name: 'Visit H5_https',
    thumb: '/image/icon/webview.png',
    nameEn: 'openH5_https',
    path: '/page/component/H5/H5',
  },
  {
    name: 'Visit H5_http',
    thumb: '/image/icon/webview.png',
    nameEn: 'openH5_http',
    path: '/page/component/H5http/H5http',
  },
];

const basicMedias = [
  {
    name: 'image',
    thumb: '/image/icon/image.png',
    nameEn: 'Image',
    path: '/page/component/image/image',
  },
];

const basicMaps = [
  {
    name: 'Map entrance',
    thumb: '/image/icon/map.png',
    nameEn: 'MapToClick',
    path: '/page/component/map/map?mapType="googleMap"',
  }
];

const basicCanvas = [
  {
    name: 'Canvas entrance',
    thumb: '/image/icon/canvas.png',
    nameEn: 'CanvasToClick',
    path: '/page/component/canvas/canvas',
  }
];

// const basicOpens = [
//   {
//     name: 'Jump life number',
//     thumb: '/image/icon/lifestyle.png',
//     nameEn: 'Lifestyle',
//     path: '/page/component/lifestyle/lifestyle',
//   },
//   {
//     name: 'Jump cloud customer service',
//     thumb: '/image/icon/contact-button.png',
//     nameEn: 'contact-button',
//     path: '/page/component/contact-button/contact-button',
//   },
//   {
//     name: 'collection',
//     thumb: '/image/icon/favorite.png',
//     nameEn: 'Favorite',
//     path: '/page/component/favorite/favorite',
//   },
// ];


let basicComponentList = [
  {
    type: 'View container',
    typeEn: 'basicContainers',
    list: basicContainers,
  },
  {
    type: 'Basic component',
    typeEn: 'basicBasics',
    list: basicBasics,
  },
  {
    type: 'Feedback',
    typeEn: 'basicFeedBacks',
    list: basicFeedBacks,
  },
  {
    type: 'Form',
    typeEn: 'basicForms',
    list: basicForms,
  },
  {
    type: 'navigation',
    typeEn: 'basicNavigators',
    list: basicNavigators,
  },
  {
    type: 'media',
    typeEn: 'basicMedias',
    list: basicMedias,
  },
  {
    type: 'canvas',
    typeEn: 'basicCanvas',
    list: basicCanvas,
  },
];

  basicComponentList = basicComponentList.concat([
    {
      type: 'map',
      typeEn: 'basicMaps',
      list: basicMaps,
    },
    // {
    //   type: '开放组件',
    //   typeEn: 'basicOpens',
    //   list: basicOpens,
    // },
  ]);

const extContainers = [
  {
    name: 'list',
    thumb: '/image/icon/form.png',
    nameEn: 'List',
    path: '/page/component/list/list',
  },
  {
    name: 'Top tab',
    thumb: '/image/icon/tabs.png',
    nameEn: 'Tabs',
    path: '/page/component/tabs/tabs',
  },
  {
    name: 'Vertical tab',
    thumb: '/image/icon/vtabs.png',
    nameEn: 'VTabs',
    path: '/page/component/vtabs/vtabs',
  },
  {
    name: 'card',
    thumb: '/image/icon/card.png',
    nameEn: 'Card',
    path: '/page/component/card/card',
  },
  {
    name: 'GongGe',
    thumb: '/image/icon/grid.png',
    nameEn: 'Grid',
    path: '/page/component/grid/grid',
  },
  {
    name: 'Steps',
    thumb: '/image/icon/steps.png',
    nameEn: 'Steps',
    path: '/page/component/steps/steps',
  },
  {
    name: 'Footer',
    thumb: '/image/icon/footer.png',
    nameEn: 'Footer',
    path: '/page/component/footer/footer',
  },
];

const pops = [
  {
    name: 'bubble',
    thumb: '/image/icon/popover.png',
    nameEn: 'Popover',
    path: '/page/component/popover/popover',
  },
  {
    name: 'Filter',
    thumb: '/image/icon/filter.png',
    nameEn: 'Filter',
    path: '/page/component/filter/filter',
  },
  {
    name: 'dialog',
    thumb: '/image/icon/modal.png',
    nameEn: 'Modal',
    path: '/page/component/modal/modal',
  },
  {
    name: 'Popup menu',
    thumb: '/image/icon/popup.png',
    nameEn: 'Popup',
    path: '/page/component/popup/popup',
  },
];

const extForms = [
  {
    name: 'Text input',
    thumb: '/image/icon/input.png',
    nameEn: 'InputItem',
    path: '/page/component/input-item/input-item',
  },
  {
    name: 'Amount input',
    thumb: '/image/icon/amount-input.png',
    nameEn: 'AmountInput',
    path: '/page/component/amount-input/amount-input',
  },
  {
    name: 'search bar',
    thumb: '/image/icon/search-bar.png',
    nameEn: 'SearchBar',
    path: '/page/component/search-bar/search-bar',
  },
  {
    name: 'Checkbox',
    thumb: '/image/icon/radio.png',
    nameEn: 'AMCheckBox',
    path: '/page/component/am-checkbox/am-checkbox',
  }
];

const results = [
  {
    name: 'Exception page',
    thumb: '/image/icon/page-result.png',
    nameEn: 'PageResult',
    path: '/page/component/page-result/page-result',
  },
  {
    name: 'Result page',
    thumb: '/image/icon/message.png',
    nameEn: 'Message',
    path: '/page/component/message/message',
  },
];

const tips = [
  {
    name: 'guide',
    thumb: '/image/icon/tips.png',
    nameEn: 'Tips',
    path: '/page/component/tips/tips',
  },
  {
    name: 'notice',
    thumb: '/image/icon/notice.png',
    nameEn: 'Notice',
    path: '/page/component/notice/notice',
  },
  {
    name: 'badge',
    thumb: '/image/icon/view.png',
    nameEn: 'Badge',
    path: '/page/component/badge/badge',
  },
];

const gestures = [
  {
    name: 'Slidable cell',
    thumb: '/image/icon/swipe-action.png',
    nameEn: 'SwipeAction',
    path: '/page/component/swipe-action/swipe-action',
  },
];

const inputs = [
]

const others = [
  {
    name: 'calendar',
    thumb: '/image/icon/calendar.png',
    nameEn: 'Calendar',
    path: '/page/component/calendar/calendar',
  },
  {
    name: 'Stepper',
    thumb: '/image/icon/stepper.png',
    nameEn: 'Stepper',
    path: '/page/component/stepper/stepper',
  },
  {
    name: 'flex',
    thumb: '/image/icon/calendar.png',
    nameEn: 'Flex',
    path: '/page/component/flex/flex',
  },
  {
    name: 'pagination',
    thumb: '/image/icon/calendar.png',
    nameEn: 'Pagination',
    path: '/page/component/Pagination/Pagination',
  },
  {
    name: 'collapse',
    thumb: '/image/icon/calendar.png',
    nameEn: 'Collapse',
    path: '/page/component/Collapse/Collapse',
  }
]

const extComponentList = [
  {
    type: 'Layout navigation',
    typeen: 'extContainers',
    list: extContainers,
  },
  {
    type: 'Operating float',
    typeen: 'pops',
    list: pops,
  },
  {
    type: 'result',
    typeen: 'results',
    list: results,
  },
  {
    type: 'Prompt guidance',
    typeen: 'tips',
    list: tips,
  },
  {
    type: 'Form',
    typeen: 'extForms',
    list: extForms,
  },
  {
    type: 'Gestures',
    typeen: 'gestures',
    list: gestures,
  },
  {
    type: 'other',
    typeen: 'others',
    list: others,
  },
];

Page({
  data: {
    top: 0,
    // hot: [
    //   { name: 'ScrollView', url: '/page/component/scroll-view/scroll-view' },
    //   { name: 'map', url: '/page/component/map/map' },
    //   { name: 'Icon', url: '/page/component/icon/icon' },
    //   { name: 'Card', url: '/page/component/card/card' },
    //   { name: 'Obtain an authorization code', url: '/page/API/get-auth-code/get-auth-code' },
    //   { name: 'Popup', url: '/page/component/popup/popup' },
    //   { name: 'Initiate an HTTP request', url: '/page/API/request/request' },
    //   { name: 'canvas', url: '/page/component/canvas/canvas' },
    //   { name: 'navigation', url: '/page/API/navigator/navigator' },
    // ],
    tabs: ['basicComponent', 'extComponent'],
    tabs_en: ['basicComponent', 'extComponent'],
    activeTab: 0,
    basicComponentList,
    extComponentList,
    titleOpacity: 1,
    shadow: false,
  },
  onPageScroll(e) {
    const { scrollTop } = e;
    let titleOpacity = 1 - scrollTop * 0.02;
    let shadow = false;

    if (titleOpacity < 0) {
      titleOpacity = 0;
    }

    if (titleOpacity > 1) {
      titleOpacity = 1;
    }

    if (scrollTop > 80) {
      my.setNavigationBar({
        title: 'Apple program official example',
      });
    } else {
      my.setNavigationBar({
        title: ' ',
      });
    }

    if (scrollTop > 320) {
      shadow = true;
    } else {
      shadow = false;
    }

    this.setData({
      shadow,
      titleOpacity,
    });
  },
  onSearchBarTap() {
    my.navigateTo({
      url: '/page/common/search/search',
    });
  },
  onTabBarTap(e) {
    const { index } = e.target.dataset
    this.setData({
      activeTab: index,
    });
  },
  async onLoad() {
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
});
