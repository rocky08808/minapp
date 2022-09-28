let T = {
  locale: null,
  locales: {},
  langCode: ['zh-Hans', 'en']
};
let lastLangIndex;

T.registerLocale = function (locales) {
  T.locales = locales;
};

T.setLocale = function (code) {
  T.locale = code;
};

T.setLocaleByIndex = function (index) {
  lastLangIndex = index;
  T.setLocale(T.langCode[index]);

  T.setTabBarLang(index);
};

T.getLanguage = function () {
  return T.locales[T.locale];
};

// 设置 TabBar 语言
T.setTabBarLang = function(index) {
  console.log("index= "+ index)
  my.call("setTabBar", {
      actionType: "setTabBarItem",
      index: 2,//测试参数为空时，是否异常
      text: 'component',//测试参数为空时，是否异常text
      iconPath: 'image/icon_API.png',//测试参数为空时，是否异常/image/api.png
      selectedIconPath: 'image/icon_component_HL.png',//测试参数为空时，是否异常/image/biz_tag.png
      success: (res) => {
        console.log({ content: "success" + JSON.stringify(res) })
      },
      fail: (res) => {
        console.log({ content: "fail" + JSON.stringify(res) })
        console.log(res)
      },
    }, function (res) { console.log(res) })
    my.call("setTabBar", {
      actionType: "setTabBarItem",
      index: 1,//测试参数为空时，是否异常
      text: 'APPX-silent',//测试参数为空时，是否异常text
      iconPath: 'image/icon_API.png',//测试参数为空时，是否异常/image/api.png
      selectedIconPath: 'image/icon_component_HL.png',//测试参数为空时，是否异常/image/biz_tag.png
      success: (res) => {
        console.log({ content: "success" + JSON.stringify(res) })
      },
      fail: (res) => {
        console.log({ content: "fail" + JSON.stringify(res) })
        console.log(res)
      },
    }, function (res) { console.log(res) })
  console.log("indexout= "+ index)
};

export default T;