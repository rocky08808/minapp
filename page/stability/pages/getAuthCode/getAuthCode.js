import { test, runAll, run } from '/util/qunit/qunit';
Page({
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
    my.getAuthCode({
      type: 'success',
      content: 'Performing one-click automation! Please wait！',
      duration: 5000
    });
    this.Qunit.runAll();
  },
  onLoad() {
    let app = getApp();
    app.Q.resetDate();

    // getAuthCode_many() {
    //     for (var i = 0; i < 50; i++) {
    //       my.getAuthCode({
    //         scopes: 'auth_user',
    //         success(res) {
    //           my.getAuthCode({ content: i+'授权成功: ' + JSON.stringify(res.data) });
    //         },
    //         fail: (error) => {
    //           my.alert({ content: '授权失败' + JSON.stringify(error), });
    //         },
    //       });
    //     }
    //   },
    this.Qunit.test("getAuthCodeObtain an authorization code_参数为数组", "getAuthCodeObtain an authorization code_参数为数组 callback测试", function (assert) {
      assert(false, "调用getAuthCode接口，没有调用fail", "调用getAuthCode接口_参数为数组，没有回调fail");
      my.getAuthCode({
        scopes: [0, 1, 2],
        fail: (res) => {
          assert(true, "getAuthCode执行fail回调", "调用getAuthCode接口,没有回调fail");
        },
      });
    });

    this.Qunit.test("getAuthCodeObtain an authorization code_参数为空", "getAuthCodeObtain an authorization code_参数为空 callback测试", function (assert) {
      assert(false, "调用getAuthCode接口,参数为空", "调用getAuthCode接口_参数为空,没有触发fail回调");
      my.getAuthCode({
        scopes: null,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "参数不合法，回调fail", "参数不合法，回调fail");
        },
      });
    });

    this.Qunit.test("getAuthCodeObtain an authorization code_参数为数字", "getAuthCode接口_参数为数字 callback测试", function (assert) {
      assert(false, "调用getAuthCode接口,参数为数字，没有回调fail", "调用getAuthCode接口_参数为数字，没有回调fail");
      my.getAuthCode({
        scopes: 0,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getAuthCode接口，参数为数字，回调fail", "调用getAuthCode接口,参数为数字，回调fail");
        },
      });
    });

    this.Qunit.test("getAuthCodeObtain an authorization code_参数为符号", "getAuthCodeObtain an authorization code_参数为符号 callback测试", function (assert) {
      assert(false, "调用getAuthCode接口_参数为符号，没有调用fail", "调用getAuthCode接口_参数为符号，没有回调fail");
      my.getAuthCode({
        scopes: '$_&*',
        fail: (res) => {
          assert(true, "调用getAuthCode接口，正常回调fail", "调用getAuthCode接口，正常回调fail");
        },
      });
    });

    this.Qunit.test("getAuthCodeObtain an authorization code_参数为布尔值", "getAuthCodeObtain an authorization code_参数为布尔值 callback测试", function (assert) {
      assert(false, "调用getAuthCode接口_参数为布尔值，没有回调fail", "调用getAuthCode接口_参数为符号，没有回调fail");
      my.getAuthCode({
        scopes: false,
        fail: (res) => {
          assert(res.authCode != '', "调用getAuthCode接口，获取成功", "调用成功，获取到code为空");
        },
      });
    });

    this.Qunit.test("getAuthCode静默授权", "getAuthCode静默授权-success callback测试", function (assert) {
      assert(false, "调用getAuthCode接口，静默授权失败", "调用失败");
      my.getAuthCode({
        scopes: 'auth_base',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(res.authCode != '', "调用getAuthCode接口，获取成功"+JSON.stringify(res), "调用成功，获取到code为空");
        },
      });
    });
    this.Qunit.test("getAuthCode主动授权", "getAuthCode主动授权-success callback测试", function (assert) {
      assert(false, "调用getAuthCode接口，主动授权失败", "调用失败");
      my.getAuthCode({
        scopes: 'auth_user',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(res.authCode != '', "调用getAuthCode接口，获取成功:"+JSON.stringify(res), "调用成功，获取到code为空");
        },
      });
    });
    this.Qunit.test("getAuthCode芝麻信用授权", "getAuthCode芝麻信用授权码-success callback测试", function (assert) {
      assert(false, "调用getAuthCode接口，芝麻信用授权失败", "调用失败");
      my.getAuthCode({
        scopes: 'auth_zhima',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(res.authCode != '', "调用getAuthCode接口，获取成功"+JSON.stringify(res));
        },
      });
    });
    this.Qunit.test("getAuthCodeObtain an authorization code-complete回调", "getAuthCodeObtain an authorization code-complete callback测试", function (assert) {
      my.getAuthCode({
        scopes: 'auth_base',
        complete: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "complete回调成功" + JSON.stringify(res), "complete回调失败");
        },
      });
    });

    //////////////// 用例结束 /////////////////////
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});
