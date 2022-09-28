Page({
  requestHttp() {
    my.httpRequest({
      url: 'https://httpbin.org/post',
      method: 'POST',
      data: {
        from: 'miniapp',

        production: 'MiniprogramJSAPI',
      },
      dataType: 'json',
      success: function (res) {
        console.log(JSON.stringify(res) )
        my.alert({ content: JSON.stringify(res) });
      },
      fail: function (res) {
        console.log(JSON.stringify(res) )
        my.alert({ content: JSON.stringify(res) });
      },
      complete: function (res) {
        // my.alert({title: 'complete'});
      }
    });
  },
  requestHttp_404() {
    my.httpRequest({
      url: 'https://maps.googleapis.com/maps/api/plae/nearbysearch/json',
      method: 'POST',
      data: {
        from: 'miniapp',

        production: 'MiniprogramJSAPI',
      },
      dataType: 'json',
      success: function (res) {
        console.log(JSON.stringify(res) )
        my.alert({ content: JSON.stringify(res) });
      },
      fail: function (res) {
        console.log(JSON.stringify(res) )
        my.alert({ content: JSON.stringify(res) });
      },
      complete: function (res) {
        // my.alert({title: 'complete'});
      }
    });
  },
  request() {
    my.request({
      url: 'https://httpbin.org/post',
      method: 'POST',
      data: {
        from: 'Paytm',
        production: 'JSAPI',
      },
      headers: {
        'content-type': 'application/json'  //默认值
      },
      timeout: 30000,
      dataType: 'json',
      success: function (res) {
        console.log(JSON.stringify(res) )
        my.alert({ content: JSON.stringify(res) });
      },
      fail: function (res) {
        console.log(JSON.stringify(res) )
        my.alert({ content: JSON.stringify(res) });
      },
      complete: function (res) {
        // my.hideLoading();
        my.alert({ content: 'complete' });
      }
    });
  },
  request_404() {
    my.request({
      // url: 'https://httpbin.org/post',
      url: 'https://maps.googleapis.com/maps/api/plae/nearbysearch/json',
      method: 'POST',
      data: {
        from: 'Paytm',
        production: 'JSAPI',
      },
      headers: {
        'content-type': 'application/json'  //默认值
      },
      timeout: 30000,
      dataType: 'json',
      success: function (res) {
        console.log(JSON.stringify(res) )
        my.alert({ content: JSON.stringify(res) });
      },
      fail: function (res) {
        console.log(JSON.stringify(res) )
        my.alert({ content: JSON.stringify(res) });
      },
      complete: function (res) {
        // my.hideLoading();
        my.alert({ content: 'complete' });
      }
    });
  },
  requestHttp_http() {
    my.httpRequest({
      url: 'http://httpbin.org/post',
      method: 'POST',
      data: {
        from: 'miniapp',

        production: 'MiniprogramJSAPI',
      },
      dataType: 'json',
      success: function (res) {
        my.alert({ content: JSON.stringify(res) });
      },
      fail: function (res) {
        my.alert({ content: JSON.stringify(res) });
      },
      complete: function (res) {
        // my.alert({title: 'complete'});
      }
    });
  },
  request_http() {
    my.request({
      url: 'http://httpbin.org/post',
      method: 'POST',
      data: {
        from: 'Paytm',
        production: 'JSAPI',
      },
      headers: {
        'content-type': 'application/json'  //默认值
      },
      timeout: 30000,
      dataType: 'json',
      success: function (res) {
        my.alert({ content: JSON.stringify(res) });
      },
      fail: function (res) {
        my.alert({ content: JSON.stringify(res) });
      },
      complete: function (res) {
        // my.alert({title: 'complete'});
      }
    });
  }
})
