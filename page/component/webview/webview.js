Page({
  data: {},
   onShareAppMessage(options) {
    my.alert({content:JSON.stringify(options.webViewUrl)});
    return {
      title: 'Share web-View component',
      desc: 'The View component is very generic',
      path: 'page/component/component-pages/webview/baidu',
      'web-view': options.webViewUrl,
    };
  },
  onmessage(e){
    my.alert({
      content: '拿到数据'+JSON.stringify(e), // alert 框的标题
    });
  }
});