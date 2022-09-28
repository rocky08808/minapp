import debounce from '/util/debounce';

const componentList = [
  { name: 'Amount input', thumb: '/image/icon/amount-input.png', path: '/page/component/amount-input/amount-input', suggestion: 'amount input' },

  { name: 'button', thumb: '/image/icon/button.png', path: '/page/component/button/button', suggestion: 'button' },
  { name: 'calendar', thumb: '/image/icon/calendar.png', path: '/page/component/calendar/calendar', suggestion: 'calendar' },

  { name: 'card', thumb: '/image/icon/card.png', path: '/page/component/card/card', suggestion: 'card' },
  { name: 'checkbox', thumb: '/image/icon/checkbox.png', path: '/page/component/checkbox/checkbox', suggestion: 'checkbox' },
  { name: 'checkbox', thumb: '/image/icon/radio.png', path: '/page/component/am-checkbox/am-checkbox', suggestion: 'checkbox' },
  { name: 'Cloud service', thumb: '/image/icon/contact-button.png', path: '/page/component/contact-button/contact-button', suggestion: 'contact button' },
  { name: 'canvas', thumb: '/image/icon/canvas.png', path: '/page/component/canvas/canvas', suggestion: 'canvas' },
  { name: 'Filter', thumb: '/image/icon/filter.png', path: '/page/component/filter/filter', suggestion: 'filter' },

  { name: 'Footer', thumb: '/image/icon/footer.png', path: '/page/component/footer/footer', suggestion: 'footer' },

  { name: 'form', thumb: '/image/icon/form.png', path: '/page/component/form/form', suggestion: 'form' },
  { name: 'GongGe', thumb: '/image/icon/grid.png', path: '/page/component/grid/grid', suggestion: 'grid' },

  { name: 'icon', thumb: '/image/icon/icon.png', path: '/page/component/icon/icon', suggestion: 'icon' },
  { name: 'image', thumb: '/image/icon/image.png', path: '/page/component/image/image', suggestion: 'image' },

  { name: 'Text input', thumb: '/image/icon/input.png', path: '/page/component/input-item/input-item', suggestion: 'input item' },

  { name: 'label', thumb: '/image/icon/label.png', path: '/page/component/label/label', suggestion: 'label' },

  { name: 'Jump life number', thumb: '/image/icon/lifestyle.png', path: '/page/component/lifestyle/lifestyle', suggestion: 'Jump life style' },

  { name: 'list', thumb: '/image/icon/form.png', path: '/page/component/list/list', suggestion: 'list' },

  { name: 'map', thumb: '/image/icon/map.png', path: '/page/component/map/map', suggestion: 'map' },
  { name: 'Result page', thumb: '/image/icon/message.png', path: '/page/component/message/massage', suggestion: 'Result page' },

  { name: 'dialog', thumb: '/image/icon/modal.png', path: '/page/component/modal/modal', suggestion: 'modal' },

  { name: 'navigator', thumb: '/image/icon/navigator.png', path: '/page/component/navigator/navigator', suggestion: 'navigator' },
  { name: 'notice', thumb: '/image/icon/notice.png', path: '/page/component/notice/notice', suggestion: 'notice' },
  { name: 'badge', thumb: '/image/icon/view.png', path: '/page/component/badge/badge', suggestion: 'badge' },
  { name: 'Exception page', thumb: '/image/icon/page-result.png', path: '/page/component/page-result/page-result', suggestion: 'page result' },

  { name: 'Selector', thumb: '/image/icon/picker.png', path: '/page/component/picker/picker', suggestion: 'picker' },

  { name: 'pickerview', thumb: '/image/icon/picker-view.png', path: '/page/component/picker-view/picker-view', suggestion: 'pickerview' },
  { name: 'bubble', thumb: '/image/icon/popover.png', path: '/page/component/popover/popover', suggestion: 'popover ' },

  { name: 'popup', thumb: '/image/icon/popup.png', path: '/page/component/popup/popup', suggestion: 'popup' },
  { name: 'progress', thumb: '/image/icon/progress.png', path: '/page/component/progress/progress', suggestion: 'progress' },
  { name: 'radio', thumb: '/image/icon/radio.png', path: '/page/component/radio/radio', suggestion: 'radio' },
  { name: 'searchbar', thumb: '/image/icon/search-bar.png', path: '/page/component/search-bar/search-bar', suggestion: 'searchbar' },
  { name: 'Slider', thumb: '/image/icon/slider.png', path: '/page/component/slider/slider', suggestion: 'slider ' },

  { name: 'Stepper', thumb: '/image/icon/stepper.png', path: '/page/component/stepper/stepper', suggestion: 'stepper' },

  { name: 'Steps', thumb: '/image/icon/steps.png', path: '/page/component/steps/steps', suggestion: 'steps' },

  { name: 'Slidable cell', thumb: '/image/icon/swipe-action.png', path: '/page/component/swipe-action/swipe-action', suggestion: 'swipe action' },

  { name: 'switch', thumb: '/image/icon/switch.png', path: '/page/component/switch/switch', suggestion: 'switch' },

  { name: 'Top tab', thumb: '/image/icon/tabs.png', path: '/page/component/tabs/tabs', suggestion: 'tabs' },

  { name: 'Multi-line input box', thumb: '/image/icon/textarea.png', path: '/page/component/textarea/textarea', suggestion: 'textarea' },

  { name: 'tips', thumb: '/image/icon/tips.png', path: '/page/component/tips/tips', suggestion: 'tips' },
  { name: 'Vertical tab', thumb: '/image/icon/vtabs.png', path: '/page/component/vtabs/vtabs', suggestion: 'vtabs' },

  { name: 'Embedded webview', thumb: '/image/icon/webview.png', path: '/page/component/webview/webview', suggestion: 'webview Embedded webview' },
  { name: 'view', thumb: '/image/icon/view.png', path: '/page/component/view/view', suggestion: 'view' },
  { name: 'Sliding view', thumb: '/image/icon/swiper.png', path: '/page/component/swiper/swiper', suggestion: 'swiper ' },

  { name: 'Scroll view', thumb: '/image/icon/scroll-view.png', path: '/page/component/scroll-view/scroll-view', suggestion: 'scrollview' },

  { name: 'input', thumb: '/image/icon/input.png', path: '/page/component/input/input', suggestion: 'Input box text input' },
  { name: 'text', thumb: '/image/icon/text.png', path: '/page/component/text/text', suggestion: 'text' },
];

const apiList = [
  { name: 'Obtain an authorization code', path: '/page/API/get-auth-code/get-auth-code', suggestion: 'getauthcodeObtain an authorization code' },
  { name: 'Getuserinfo gets user information', path: '/page/API/get-user-info/get-user-info', suggestion: 'Getuserinfo gets user information' },

  { name: 'Initiate payment', path: '/page/API/request-payment/request-payment', suggestion: 'request payment' },

  { name: 'Miniprogram card bag', path: '/page/API/card-pack/card-pack', suggestion: 'cardpack Miniprogram card bag' },
  { name: 'zmcreditborrow', path: '/page/API/zm-credit-borrow/zm-credit-borrow', suggestion: 'zmcreditborrow' },

  { name: 'text risk identification', path: '/page/API/text-risk-identification/text-risk-identification', suggestion: 'text risk identification' },
  { name: 'alert', path: '/page/API/alert/alert', suggestion: 'alert' },
  { name: 'promot', path: '/page/API/promot/promot', suggestion: 'promot' },
  { name: 'Confirmation box', path: '/page/API/confirm/confirm', suggestion: 'confirm' },

  { name: 'toast', path: '/page/API/toast/toast', suggestion: 'toast' },
  { name: 'loading', path: '/page/API/loading/loading', suggestion: 'loading' },
  { name: 'actionsheet', path: '/page/API/action-sheet/action-sheet', suggestion: 'actionsheet' },
  { name: 'Set the interface navigation bar', path: '/page/API/set-navigation-bar/set-navigation-bar', suggestion: 'set navigationbar' },

  { name: 'setoptionMenu', path: '/page/API/option-menu/option-menu', suggestion: 'setoptionMenu' },

  { name: 'Page jump', path: '/page/API/navigator/navigator', suggestion: 'Navigator page jump' },

  { name: 'pulldownrefresh', path: '/page/API/pull-down-refresh/pull-down-refresh', suggestion: 'pulldownrefresh' },
  { name: 'Create animation', path: '/page/API/animation/animation', suggestion: 'Create animation ' },

  { name: 'canvas', path: '/page/API/canvas/canvas', suggestion: 'canvas' },
  { name: 'datepicker', path: '/page/API/date-picker/date-picker', suggestion: 'datepicker' },
  { name: 'pagescrollto', path: '/page/API/page-scroll-to/page-scroll-to', suggestion: 'pagescrollto' },
  { name: 'createselectorquery', path: '/page/API/create-selector-query/create-selector-query', suggestion: 'createselectorquery' },
  { name: 'contact', path: '/page/API/contact/contact', suggestion: 'contact' },
  { name: 'Title bar loading animation', path: '/page/API/navigation-bar-loading/navigation-bar-loading', suggestion: 'navigatiobar loading' },

  { name: 'choose city', path: '/page/API/choose-city/choose-city', suggestion: 'choose city' },
  { name: 'hide keyboard', path: '/page/API/keyboard/keyboard', suggestion: 'hide keyboard' },
  { name: 'multilevelselect', path: '/page/API/multi-level-select/multi-level-select', suggestion: 'multilevelselect' },
  { name: 'multilevelselect', path: '/page/API/options-select/options-select', suggestion: 'multilevelselect' },
  { name: 'getnetworktype', path: '/page/API/get-network-type/get-network-type', suggestion: 'getnetworktype' },
  { name: 'getsysteminfo', path: '/page/API/get-system-info/get-system-info', suggestion: 'getsysteminfo' },
  { name: 'vibrate', path: '/page/API/vibrate/vibrate', suggestion: 'vibrate' },
  { name: 'clipboard', path: '/page/API/clipboard/clipboard', suggestion: 'clipboard' },
  { name: 'sdk version', path: '/page/API/sdk-version/sdk-version', suggestion: 'sdk version' },
  { name: 'screen', path: '/page/API/screen/screen', suggestion: 'Screen brightness' },
  { name: 'watchshake', path: '/page/API/watch-shake/watch-shake', suggestion: 'watchshake' },
  { name: 'makephonecall', path: '/page/API/make-phone-call/make-phone-call', suggestion: 'makephonecall' },
  { name: 'User screen capture event', path: '/page/API/user-capture-screen/user-capture-screen', suggestion: 'User screen capture event' },
  { name: 'getservertime', path: '/page/API/get-server-time/get-server-time', suggestion: 'get server time ' },

  { name: '内存不足警告', path: '/page/API/memory-warning//memory-warning', suggestion: 'memorywarning内存不足警告' },
  { name: 'Initiate an HTTP request', path: '/page/API/request/request', suggestion: 'Initiate http request network' },

  { name: 'uploadfile', path: '/page/API/upload-file/upload-file', suggestion: 'uploadfile' },
  { name: 'download file', path: '/page/API/download-file/download-file', suggestion: 'download file' },

  { name: 'Websocket', path: '/page/API/websocket/websocket', suggestion: 'websocket' },
  { name: 'image', path: '/page/API/image/image', suggestion: 'image' },
  { name: 'Get image information', path: '/page/API/get-image-info/get-image-info', suggestion: 'Get image information' },
  { name: 'compressimage', path: '/page/API/compress-image/compress-image', suggestion: 'compressimage' },
  { name: 'Get current position', path: '/page/API/get-location/get-location', suggestion: 'get location' },

  { name: 'Use the native map to view the location', path: '/page/API/open-location/open-location', suggestion: 'Use the native map to view the location' },
  { name: 'Choose location', path: '/page/API/choose-location/choose-location', suggestion: 'Open the map and select your location' },
  { name: 'cache', path: '/page/API/storage/storage', suggestion: 'storage' },

  { name: 'scan code', path: '/page/API/scan-code/scan-code', suggestion: 'scan-code' },
  { name: 'share', path: '/page/API/share/share', suggestion: 'Custom sharing' },
  { name: 'file', path: '/page/API/file/file', suggestion: 'file' },
  { name: 'bluetooth', path: '/page/API/bluetooth/bluetooth', suggestion: 'bluetooth' },
  { name: 'Data Security', path: '/page/API/rsa/rsa', suggestion: 'rsa' },
  { name: 'reportanalytics', path: '/page/API/report-analytics/report-analytics', suggestion: 'reportanalytics' },
  { name: 'events', path: '/page/API/events/events', suggestion: 'events' },
  { name: 'OCR', path: '/page/API/ocr/ocr', suggestion: 'ocr' },
]

Page({
  data: {
    value: '',
    history: my.getStorageSync({ key: 'searchHistory' }).data || [],
    hot: [
      { name: 'ScrollView', url: '/page/component/scroll-view/scroll-view' },
      { name: 'map', url: '/page/component/map/map' },
      { name: 'Icon', url: '/page/component/icon/icon' },
      { name: 'Card', url: '/page/component/card/card' },
      { name: 'Obtain an authorization code', url: '/page/API/get-auth-code/get-auth-code' },
      { name: 'Popup', url: '/page/component/popup/popup' },
      { name: 'Initiate an HTTP request', url: '/page/API/request/request' },
      { name: 'canvas', url: '/page/component/canvas/canvas' },
      { name: 'navigation', url: '/page/API/navigator/navigator' },
    ],
    componentSuggestions: [],
    apiSuggestions: [],
  },
  onLoad() {
    this.setData({
      history: my.getStorageSync({ key: 'searchHistory' }).data,
    });
    console.log(my.getStorageSync({ key: 'searchHistory' }).data);
    this.onInput = debounce(this.onInput.bind(this), 400);
    my.setNavigationBar({
      borderBottomColor: '#fff',
    });
  },
  clear() {
    my.confirm({
      content: 'Make sure to delete related history？',
      success: (res) => {
        if (res.confirm) {
          my.clearStorage();
          this.setData({
            history: [],
          });
        }
      },
    })
  },
  onInput(keyword) {
    this.setData({
      value: keyword,
    });
    const regExp = /[A-Za-z]/;
    if (keyword === '' || (regExp.test(keyword) && keyword.length === 1)) {
      this.setData({
        componentSuggestions: [],
        apiSuggestions: [],
      });
      return;
    }
    const componentSuggestions = [];
    const apiSuggestions = [];
    for (let i = 0; i < componentList.length; i++) {
      if (componentList[i].suggestion.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1) {
        componentSuggestions.push(componentList[i]);
      }
    }

    for (let i = 0; i < apiList.length; i++) {
      if (apiList[i].suggestion.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1) {
        apiSuggestions.push(apiList[i]);
      }
    }
    this.setData({ componentSuggestions, apiSuggestions })
  },
  onClear() {
    this.setData({
      value: '',
    });
  },
  onCancel() {
    this.setData({
      componentSuggestions: [],
      apiSuggestions: [],
      value: '',
    });
    my.navigateBack();
  },
  onItemTap({ name }) {
    this.setData({
      value: name,
    });

    this.onInput(name);
  },
  onListItemTap(e) {
    const { name, url } = e.target.dataset;
    this.addToHistory(name);
    my.navigateTo({ url });
  },
  addToHistory(keyword) {
    const searchHistory = my.getStorageSync({ key: 'searchHistory' }).data || [];
    let index = -1;

    for (let i = 0; i < searchHistory.length; i++) {
      if (searchHistory[i].name === keyword) {
        index = i;
        break;
      }
    }

    let history = [];

    if (searchHistory.length >= 8) {
      if (index === -1) {
        history = [{ name: keyword }, ...searchHistory.slice(0, 7)];
      } else {
        searchHistory.splice(index, 1).slice(0, 7)
        history = [{ name: keyword }, ...searchHistory];
      }
    } else {
      if (index === -1) {
        history = [{ name: keyword }, ...searchHistory];
      } else {
        searchHistory.splice(index, 1) 
        history = [{ name: keyword }, ...searchHistory];
      }
    }

    my.setStorageSync({
      key: 'searchHistory',
      data: history,
    });

    this.setData({
      history,
    })
  }
});