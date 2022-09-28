import { test, runAll, run } from '/util/qunit/qunit';
Page({
  data: {},
  Qunit: {
    idx: -1,
    test: function (name, desc, callback) {
      test(name, desc, callback)
    },
    runAll: function () {
      runAll();
    },
  },

  onItemTap(event) {
   let app = getApp();
    let idx = event.currentTarget.id;
    
    if(app.Q.data.tests[idx].status == "show"){
      app.Q.data.tests[idx].status = "hide";
    }else{
      app.Q.data.tests[idx].status = "show";
    };

    this.setData(app.Q.data);
  },
  onRunTap(event) {
    let idx = event.currentTarget.id;
    run(idx);
  },
  handleTap(event) {
    my.showToast({
      type: 'success',
      content: 'Performing one-click automation! Please wait！',
      duration: 5000
    });
    this.Qunit.runAll();
  },
  onLoad() {

    let app = getApp();
    app.Q.resetDate();
    //参数校验
    this.Qunit.test("http请求_complete", "httpRequest接口complete callback测试", function (assert) {
      my.httpRequest({
        url: 'http://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        dataType: 'json',
        complete: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用httpRequest接口成功，获取complete回调" + JSON.stringify(res));
        },
      })
    });

    this.Qunit.test("http请求", "httpRequest接口success callback测试", function (assert) {
      my.httpRequest({
        url: 'http://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        dataType: 'json',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用httpRequest接口成功，请求接口成功" + JSON.stringify(res), "调用httpRequest接口失败，请求接口失败");
        },
      });
      assert(false,"调用httpRequest接口成功，请求接口成功", "调用httpRequest接口失败，请求接口失败");
    });


    
    this.Qunit.test("http请求_many", "httpRequest接口success callback测试", function (assert) {
      for (var i = 0; i < 30; i++) {
      my.httpRequest({
        url: 'http://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        dataType: 'json',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "循环调用httpRequest接口成功，请求接口成功" + JSON.stringify(res), "循环调用httpRequest接口失败，请求接口失败");
        },
      })
      };
      assert(false,"循环调用httpRequest接口成功，请求接口成功", "循环调用httpRequest接口失败，请求接口失败");
    });


    this.Qunit.test("http请求_parameter_null", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: null,
        headers: null,
        method: null,
        data: null,
        timeout: null,
        dataType: null,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用httpRequest接口成功，请求接口成功" + JSON.stringify(res), "调用httpRequest接口失败，请求接口失败");
        },
      });
      assert(false,"调用httpRequest接口成功，请求接口成功", "调用httpRequest接口失败，请求接口失败");
    });

    this.Qunit.test("http请求_timeout", "httpRequest接口success callback测试", function (assert) {
      my.httpRequest({
        url: 'http://httpbin.org/post',
        timeout: 90000,
        dataType: 'json',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用httpRequest接口成功，请求接口成功" + JSON.stringify(res), "调用httpRequest接口失败，请求接口失败");
        },
      });
      assert(false,"调用httpRequest接口成功，请求接口成功", "调用httpRequest接口失败，请求接口失败");
    });


    this.Qunit.test("http请求_parameter_number", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 1,
        headers: 1,
        method: 1,
        data: 1,
        timeout: 1,
        dataType: 1,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用httpRequest接口成功，请求接口成功" + JSON.stringify(res), "调用httpRequest接口失败，请求接口失败");
        },
      });
      assert(false,"调用httpRequest接口成功，请求接口成功", "调用httpRequest接口失败，请求接口失败");
    });

    this.Qunit.test("http请求_parameter_array", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: ['0', '1', '2'],
        headers: [0, 1, 2],
        method: [0, 1, 2],
        data: [0, 1, 2],
        timeout: [0, 1, 2],
        dataType: [0, 1, 2],
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用httpRequest接口成功，请求接口成功" + JSON.stringify(res), "调用httpRequest接口失败，请求接口失败");
        },
      });
      assert(false,"调用httpRequest接口成功，请求接口成功", "调用httpRequest接口失败，请求接口失败");
    });


    //////////////// 用例结束 /////////////////////
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});






// Page({
//   data: {},
//   httpRequest() {
//     my.httpRequest({
//       url: 'http://httpbin.org/post',
//       method: 'POST',
//       data: {
//         from: 'miniapp',

//         production: 'MiniprogramJSAPI',
//       },
//       dataType: 'json',
//       success: (res) => {
//         my.alert({ content: '请求成功：'+JSON.stringify(res) });
//       },
//       fail: (error) => {
//         my.alert({ content: '请求失败：'+JSON.stringify(error) });
//       },
//       complete: (res) => {
//         my.alert({ content: 'complet回调', });
//       }
//     });
//   },

//   httpRequest_timeout() {
//     my.httpRequest({
//       url: 'http://httpbin.org/post',
//       timeout: 90000,
//       dataType: 'json',
//       success: (res) => {
//         my.alert({ content: JSON.stringify(res) });
//       },
//       fail: (error) => {
//         my.alert({ content: '请求失败：' + JSON.stringify(error) });
//       },
//     });
//   },
//   httpRequest_many() {
//     for (var i = 0; i < 30; i++) {
//       my.httpRequest({
//         url: 'http://httpbin.org/post',
//         method: 'POST',
//         data: {
//           from: 'miniapp',

//           production: 'MiniprogramJSAPI',
//         },
//         timeout: 20000,
//         dataType: 'json',
//         success: (res) => {
//           my.showToast({ content: i +'请求成功：'+ JSON.stringify(res) });
//         },
//         fail: (error) => {
//           my.alert({ content: '调用失败：' + JSON.stringify(error) });
//         },
//       });
//     }
//   },
//   httpRequest_null() {
//     my.httpRequest({
//       url: null,
//       headers: null,
//       method: null,
//       data: null,
//       timeout: null,
//       dataType: null,
//       success: (res) => {
//         my.alert({ content: JSON.stringify(res) });
//       },
//       fail: (error) => {
//         my.alert({ content: '请求失败：' + JSON.stringify(error) });
//       },
//     });
//   },
//   httpRequest_number() {
//     my.httpRequest({
//       url: 0,
//       headers: 0,
//       method: 0,
//       data: 0,
//       timeout: 0,
//       dataType: 0,
//       success: (res) => {
//         my.alert({ content: JSON.stringify(res) });
//       },
//       fail: (error) => {
//         my.alert({ content: '请求失败：' + JSON.stringify(error) });
//       },
//     });
//   },
//   httpRequest_array() {
//     my.httpRequest({
//       url: ['0', '1', '2'],
//       headers: [0, 1, 2],
//       method: [0, 1, 2],
//       data: [0, 1, 2],
//       timeout: [0, 1, 2],
//       dataType: [0, 1, 2],
//       success: (res) => {
//         my.alert({ content: JSON.stringify(res) });
//       },
//       fail: (error) => {
//         my.alert({ content: '请求失败：' + JSON.stringify(error) });
//       },
//     });
//   },

// });
