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
    my.showToast({
      type: 'success',
      content: 'Performing one-click automation! Please wait！',
      duration: 10000
    });
    this.Qunit.runAll();
  },
  onLoad() {
    let app = getApp();
    app.Q.resetDate();

    // showToast_many() {
    //   for (var i = 0; i < 20; i++) {
    //     my.showToast({
    //       content: 'This is a weak hint',
    //       success: (res) => {
    //         my.showToast({ content: '调用成功', });
    //       },
    //       fail: (error) => {
    //         my.alert({ content: '调用失败', });
    //       },
    //     });
    //   }
    // },

    this.Qunit.test("showToast弱提示_参数为数组", "showToast弱提示_参数为数组 callback测试", function (assert) {
      assert(false, "调用showToast接口，没有调用fail", "调用showToast接口_参数为数组，没有回调fail");
      my.showToast({
        content: [0, 1, 2],
        type: [0, 1, 2],
        duration: [0, 2, 5],
        fail: (res) => {
          assert(true, "showToast执行fail回调", "调用showToast接口,没有回调fail");
        },
      });
    });

    this.Qunit.test("showToast弱提示_参数为数字", "showToast接口_参数为数字 callback测试", function (assert) {
      assert(false, "调用showToast接口,参数为数字，没有回调fail", "调用showToast接口_参数为数字，没有回调fail");
      my.showToast({
        content: 0,
        type: 0,
        duration: 0,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用showToast接口，参数为数字，回调fail", "调用showToast接口,参数为数字，回调fail");
        },
      });
    });

    this.Qunit.test("showToast弱提示_参数为空", "showToast弱提示_参数为空 callback测试", function (assert) {
      assert(false, "调用showToast接口,参数为空", "调用showToast接口_参数为空,没有触发fail回调");
      my.showToast({
        content: null,
        type: null,
        duration: null,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "参数不合法，回调fail", "参数不合法，回调fail");
        },
      });
    });

    this.Qunit.test("showToast弱提示_参数为符号", "showToast弱提示_参数为符号 callback测试", function (assert) {
      assert(false, "调用showToast接口_参数为符号，没有调用fail", "调用showToast接口_参数为符号，没有回调fail");
      my.showToast({
        content: '+_#@??',
        type: '*#^&$',
        duration: _,
        fail: (res) => {
          assert(true, "调用showToast接口，正常回调fail", "调用showToast接口，正常回调fail");
        },
      });
    });

    this.Qunit.test("showToast弱提示_参数为布尔值", "showToast弱提示_参数为布尔值 callback测试", function (assert) {
      assert(false, "调用showToast接口_参数为布尔值，没有回调fail", "调用showToast接口_参数为符号，没有回调fail");
      my.showToast({
        content: false,
        type: true,
        duration: false,
        fail: (res) => {
          assert(true, "调用showToast接口，正常回调fail", "调用showToast接口，正常回调fail");
        },
      });
    });

    this.Qunit.test("showToast弱提示", "showToast弱提示-success callback测试", function (assert) {
      my.showToast({
        type: 'success',
        content: 'This is a weak hint',
        duration: 3000,
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用showToast接口，操作成功"+JSON.stringify(res));
        },
      });
    });

    this.Qunit.test("showToast弱提示-complete回调", "showToast弱提示-complete callback测试", function (assert) {
      my.showToast({
        type: 'success',
        content: 'This is a weak hint',
        duration: 3000,
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