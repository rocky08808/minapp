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
      duration: 5000
    });
    this.Qunit.runAll();
  },
  onLoad() {
    let app = getApp();
    app.Q.resetDate();

    // redirectTo_many() {
    //   for (var i = 0; i < 10; i++) {
    //     my.redirectTo({
    //       url: '../getSystemInfo/getSystemInfo',
    //       success: () => {
    //         my.showToast({ content: '跳转成功', });
    //       },
    //       fail: (error) => {
    //         abridge.alert({ content: '调用失败'+JSON.stringify(error), });
    //       },
    //     });
    //   }
    // },
    this.Qunit.test("redirectTo跳转_url为空", "redirectTo跳转_url为空 callback测试", function (assert) {
      assert(false, "调用redirectTo接口,参数为空", "调用redirectTo接口_url为空,没有触发fail回调");
      my.redirectTo({
        url: null,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "参数不合法，回调fail", "参数不合法，回调fail");
        },
      });
    });

    this.Qunit.test("redirectTo跳转_url为数字", "redirectTo接口_url为数字 callback测试", function (assert) {
      assert(false, "调用redirectTo接口,参数为数字，没有回调fail", "调用redirectTo接口_url为数字，没有回调fail");
      my.redirectTo({
        url: 0,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用redirectTo接口，参数为数字，回调fail", "调用redirectTo接口,参数为数字，回调fail");
        },
      });
    });

    this.Qunit.test("redirectTo跳转_url为数组", "redirectTo跳转_url为数组 callback测试", function (assert) {
      assert(false, "调用redirectTo接口，没有调用fail", "调用redirectTo接口_url为数组，没有回调fail");
      my.redirectTo({
        url: [0, 1, 2],
        fail: (res) => {
          assert(true, "redirectTo执行fail回调", "调用redirectTo接口,没有回调fail");
        },
      });
    });

    this.Qunit.test("redirectTo跳转_url为符号", "redirectTo跳转_url为符号 callback测试", function (assert) {
      assert(false, "调用redirectTo接口_url为符号，没有调用fail", "调用redirectTo接口_url为符号，没有回调fail");
      my.redirectTo({
        url: '&%#',
        fail: (res) => {
          assert(true, "调用redirectTo接口，正常回调fail", "调用redirectTo接口，正常回调fail");
        },
      });
    });

    this.Qunit.test("redirectTo跳转_url为布尔值", "redirectTo跳转_url为布尔值 callback测试", function (assert) {
      assert(false, "调用redirectTo接口_url为布尔值，没有回调fail", "调用redirectTo接口_url为符号，没有回调fail");
      my.redirectTo({
        url: true,
        fail: (res) => {
          assert(true, "调用redirectTo接口，正常回调fail", "调用redirectTo接口，正常回调fail");
        },
      });
    });
    this.Qunit.test("redirectTo跳转", "redirectTo跳转-success callback测试", function (assert) {
      my.redirectTo({
        url: '../getSystemInfo/getSystemInfo',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用redirectTo接口，跳转成功,success回调成功");
        },
      });
    });

    this.Qunit.test("redirectTo跳转-complete回调", "redirectTo跳转-complete callback测试", function (assert) {
      my.redirectTo({
        url: '../getSystemInfo/getSystemInfo',
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
